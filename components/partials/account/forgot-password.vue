<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Reset Password</h5>
            <div class="form-group">
                <span class="red--text" > {{ backendEmailErrors }} </span>
                <v-text-field
                    v-model="email"
                    class="ps-text-field"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    placeholder="Email"
                    height="50"
                    outlined
                />
            </div>
            <!-- <div class="form-group">
                <v-checkbox label="Remember me" color="warning" />
            </div> -->
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >
                    Login
                </button>
            </div>
        </div>
        <div class="ps-form__footer">
            <p>Connect with:</p>
            <ul class="ps-list--social">
                <li>
                    <a href="#" class="facebook">
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="google">
                        <i class="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="twitter">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="instagram">
                        <i class="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </div>
    </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import Cookies from 'js-cookie';

export default {
    name: 'Login',
    computed: {
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required && errors.push('This field is required');
            return errors;
        },
    },
    data() {
        return {
            email: null,
            backendEmailErrors: '',
        };
    },
    validations: {
        email: { required },
    },
    methods: {
        handleSubmit() {
            this.$v.$touch();
            const payload = {
                email : this.email,
            } 
            if (!this.$v.$invalid) {
               this.$store.dispatch('auth/forgot', payload)
               .then(response => {
                   if(response.data.status) {
                       alert(response.data.message)
                    this.$router.push('/account/login');
                   }else {
                       this.backendEmailErrors = response.data.message
                   }
               })
                
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
