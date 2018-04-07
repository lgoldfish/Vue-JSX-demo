import Vue from 'vue';
import Component from 'vue-class-component';
import styles from './style.css';

@Component({
    props: {
        isActive: Boolean,
        header: null,
    },
})
class Accordion extends Vue {
    isCanAnimate = '';

    data() {
        return {
            data_isActive: this.isActive,
        };
    }

    toggleContent() {
        this.isCanAnimate = true;
        this.data_isActive = !this.data_isActive;
    }

    render() {
        return (
            <div class={styles.accordion}>
                <div class={styles.header}
                    onClick={this.toggleContent}>
                    {this.header}
                    <i ref="arrow"
                        style={!this.isCanAnimate && { transform: this.isActive ? 'rotate(270deg)' : 'rotate(90deg)' }}
                        class={this.isCanAnimate &&
                        (!this.data_isActive ? styles.close : styles.open)}/>
                </div>
                <div class={`${styles.content} 
                    ${!this.isCanAnimate && (!this.data_isActive ? styles.heightHide : '')} 
                    ${this.isCanAnimate && (!this.data_isActive ? styles.hide : styles.show)}`}
                    ref="content">
                    {this.$slots.default}
                </div>
            </div>
        );
    }
}

export default Accordion;
