import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';

/* eslint-disable */
@Component({
    props: {
        title: String,
        message: String,
        btnList: Array,
        onClose: Function,
    },
})
class Alert extends Vue {
    render() {
        const list = this.btnList.slice(0, 2);
        return (
            <div class={styles.modalContainer}>
                <div class={styles.modal}>
                    <div class={styles.title}>{this.title}</div>
                    <div class={styles.message}>{this.message}</div>
                    <div class={styles.operate}>
                        {
                            list.slice(0, 2).map((item, i) => (
                                <button key={i.toString()}
                                    onClick={() => {
                                        item.onPress && item.onPress();
                                        this.onClose && this.onClose();
                                    }}
                                    style={{ width: 100 / list.length + '%' }}>

                                    {item.text}
                                </button>
                            ))
                        }
                        {
                            this.btnList.length === 0 &&
                            <button style={{ width: '100%' }}
                                onClick={this.onClose}>确定</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function alert(title, message, btnList) {
    let modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);


    let modal = new Vue({
        el: modalContainer,
        data: { title, message, btnList },
        methods: {
            close() {
                modal.$destroy();
                modal.$el.remove();
                modal = null;
            }
        },
        template: '<Alert :message="message" :title="title" :btnList="btnList" :onClose="close"/>',
        components: { Alert },
    });
}

export default {
    alert,
};
