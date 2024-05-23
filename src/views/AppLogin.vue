<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-5">
                <nav class="panel"> 
                    <p class="panel-heading"> 
                        Acceso al sistema 
                    </p> 
                    <div class="panel-heading has-background-white"> 
                        <div class="columns">
                            <div class="column is-12">
                                <form @submit.prevent="login">
                                    <div class="field">
                                        <div class="control">
                                            <input
                                                type="text"
                                                :class="{'input is-family-monospace has-text-centered': true, 'is-danger': form.errors.username}"
                                                v-model="form.data.username"
                                                placeholder="Usuario"
                                            >
                                        </div>

                                        <strong class="help is-danger" v-text="form.errors.username" v-if="form.errors.username"></strong>
                                    </div>

                                    <div class="field">
                                        <div class="control">
                                            <input
                                                type="password"
                                                :class="{'input is-family-monospace has-text-centered': true, 'is-danger': form.errors.password}"
                                                v-model="form.data.password"
                                                placeholder="Contraseña"
                                            >
                                        </div>

                                        <strong class="help is-danger" v-text="form.errors.password" v-if="form.errors.password"></strong>
                                    </div>

                                    <div class="control has-text-centered">
                                        <button type="submit" :class="{'button is-success is-family-monospace': true, 'is-loading': loading}">
                                            Ingresar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </section>
</template>

<script>
    import { ref } from 'vue'
    import { useStore } from 'vuex'
    // import { useRouter } from 'vue-router'
    // import helpers from '../helpers'

    export default {
        name: 'AppLogin',
        setup () {
            const store = useStore()
            // const router = useRouter()
            // const { handleErrors } = helpers()

            let loading = ref(false)
            let form = ref({
                errors: {},
                data: {
                    username: '',
                    password: ''
                }
            })

            const login = async () => {
                loading.value = true

                try {
                    await store.dispatch('login', form.value.data)

                    form.value.errors = {}
                    // router.replace({ name: 'navbar' })
                }
                catch (error) {
                    // form.value.errors = handleErrors(error)
                    loading.value = false
                }
            }

            return { loading, form, login }
        }
    }
</script>