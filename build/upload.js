const Oss = require('ali-oss');
const fs = require('fs');
const path = require('path');
const config = require('../uploadConfig.json');

const { targetPath, version, bucket } = config;
const targetUploadPath = `${targetPath}${version ? '/' + version : '' }`;
const distPath = path.resolve(__dirname, '..', config.uploadDir);

const client = new Oss.Wrapper({
    accessKeyId: 'LTAIPwZPhJ0stU4X',
    accessKeySecret: 'DiSSv6MMxRg0kzEtiHgqsT1wVmekRn',
    bucket,
    region: 'oss-cn-shanghai',
});

async function uploadFile(tempPath, file) {
    return await client.put(`${targetUploadPath}/${tempPath}`, file);
}

async function deleteFile(file) {
    if (Array.isArray(file)) {
        return await client.deleteMulti(file, {
            quiet: true,
        });
    } else {
        return await client.delete(file);
    }
}

function loopUpload(file) {
    const promiseList = [];

    function loop(file) {
        const stats = fs.statSync(file);
    
        if (!stats.isDirectory()) {
            const filterPath = file.slice(distPath.length + 1);
            const arr = filterPath.split('/').filter(val => Boolean(val));
            const tempPath = arr.join('/');
            const uploadRes = uploadFile(tempPath, file).then(() => {
                console.log(`> upload ${tempPath} success`);
            });
            promiseList.push(uploadRes);
        } else {
            const files = fs.readdirSync(file);
            for (let i = 0; i < files.length; i += 1) {
                loop(`${file}/${files[i]}`);
            }
        }
    }

    loop(file);
    
    return Promise.all(promiseList);
}

async function listFile() {
    return await client.list({
        prefix: `${targetUploadPath}/`,
    });
}

function successUpload() {
    console.log('> upload all success');
    console.log(`> url: ${config.baseUrl}/${targetUploadPath}/index.html`);
}

listFile().then(async (res) => {
    try {
        if (!res.objects) {
            await loopUpload(distPath);
            successUpload();
            return;
        }
    
        let exitFiles = res.objects.map(val => val.name);
        await deleteFile(exitFiles);
        console.log('> delete old file success');
        await loopUpload(distPath);
        successUpload();
    } catch (err) {
        console.log('> Upload filed', err);
    }
});
