<template>
    <div :class="{'modal modal-fx-fadeInScale': true, 'is-active': show}">
        <div class="modal-background" @click="animation_modal_content = false" v-if="loading == false"></div>

        <div :class="{'modal-content notification-juan animate__animated': true, 
        'animate__flipInX': animation_modal_content, 
        'animate__flipOutX': animation_modal_content == false }"
        @animationend="animationEndModalContent">
            <div class="modal-card">
                <section class="modal-card-body">
                    <div class="columns mb-0">
                      <div class="column is-half is-offset-one-quarter">
                            <figure class="image is-128x128-juan"> 
                                <img class="ml-4" src="../../public/advertencia.png" />
                            </figure>
                      </div>
                    </div>
                    <h1 class="title is-1 has-text-warning has-text-centered animate__animated animate__flash animate__infinite" v-text="data.title"></h1>
                    <h4 v-for="item in data.message" :key="item" class="subtitle is-4 has-text-centered mb-3" v-text="item"></h4>
                    <p class="mt-6 mb-6 has-text-white">M</p>
                    <p class="mt-6 mb-6 has-text-white">M</p>
                    <p class="mt-6 mb-6 has-text-white">M</p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import helpers from '../helpers'

export default {
    name: 'ModalNotification',
    emits: ['close', 'getData'],
    props: {
        show: Boolean,
        data: Object
    },
    setup (props, { emit }) {
        let loading = ref(false)
        let animation_modal_content = ref(true)
        let form = ref({
            errors: {},
            data: {
                reason_delete: '',
                _method: 'put'
            }
        })

        const { handleRequest, handleErrors } = helpers()

        const destroy = async () => {
            loading.value = true

            try {
                await handleRequest('delete', props.data.url)

                emit('close')
            }
            catch (error) {
                form.value.errors = handleErrors(error)
            }
            finally {
                loading.value = false
            }
        }

        const animationEndModalContent = async () => {
            if(animation_modal_content.value == false) {
               emit('close')
               animation_modal_content.value = true
            }
        }

        watch(() => props.show, () => {
            form.value.errors = {}
            form.value.data.reason_delete = ''
            form.value.data._method = 'put'
        })

        return { loading, animation_modal_content, destroy, animationEndModalContent, form }
    }
}
</script>

<style lang="css">
.notification-juan {
    border-radius: 50%;
    height: 100%;
    width: 64%;
    border-style: solid;
    border-width: 17px;
    border-color: orange;
}
.is-128x128-juan {
    height: 228px;
    width: 228px;
}
</style>