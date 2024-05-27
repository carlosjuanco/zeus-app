import axios from 'axios'
// import { toast } from 'bulma-toast'
// import _ from 'lodash'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const helpers = () => {
    const store = useStore()
    const router = useRouter()

    const handleRequest = async (method, url, data, id) => {
        if (url.endsWith('/')) {
            url = url.slice(0, -1)
        }

        if (id) {
            url += `/${id}`
            data['_method'] = 'put'
        }

        const response = await axios({ method, url, data })

        if (response.data.message) {
            console.log(response.data.message)
            // toast({
            //     message: response.data.message,
            //     type: 'is-success'
            // })
        }

        return response.data
    }

    const handleErrors = error => {
        let message = ''
        if (error.response) {
            message = error.response.data.error
        }
        else {
           message = error.message
        }

        return message
    }

    const logout = async () => {
        try {
            await store.dispatch('logout')

            router.replace({ name: 'login' })
        }
        catch (error) {
            handleErrors(error)
        }
    }

    const getInformationUser = () => {
        return store.getters.user
    }

    const setForm = (fields, data) => {
        let form = {
            errors: {},
            data: {}
        }

        Object.keys(fields).map(k => {
            if (k != '_method') {
                form.data[k] = data[k] ? data[k] : ''
            }
        })

        return form
    }

    const clipHtml = show => {
        const html = document.querySelector('html')

        if (show) {
            html.classList.add('is-clipped')
        }
        else {
            html.classList.remove('is-clipped')
        }
    }

    

    const getFile = url => {
        window.open(`http://127.0.0.1:8000/storage/${url}`, '_blank')
    }

    return {
        handleRequest,
        handleErrors,
        logout,
        getInformationUser,
        setForm,
        clipHtml,
        getFile
    }
}

export default helpers