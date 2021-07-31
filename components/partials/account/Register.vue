<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Register An Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    @input="$v.name.$touch()"
                    placeholder="Name"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <span 
                v-if="backendErrors.email"
                class="red--text"
                >
                 {{ backendErrors.email[0] }}
                </span>
                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    placeholder="Email Address"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <span 
                v-if="backendErrors.password"
                class="red--text"
                >
                 {{ backendErrors.password[0] }}
                </span>
                <v-text-field
                    v-model="password"
                    type="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Password"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="confirmPassword"
                    type="password"
                    :error-messages="isMatchPassword"
                    @input="$v.confirmPassword.$touch()"
                    placeholder="Confirm Password"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                    :disable="isDisabled"
                >
                    Register
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

export default {
    name: 'Register',
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push('Name is required');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required && errors.push('Email is required');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('Password is required');
            return errors;
        },
        confirmPasswordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('Confirm Password is required');
            return errors;
        },
        isMatchPassword() {
            if(this.password !== this.confirmPassword && this.password !== null  && this.confirmPassword !== null ) {
                const errors = [];
                errors.push('Confirm Password does not match')
                return errors
            }
        }
    },
    data() {
        return {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
            backendErrors: {},
            isDisabled: false
        };
    },
    validations: {
        name: { required },
        email: { required },
        password: { required },
        confirmPassword: { required }
    },
    methods: {
        handleSubmit() {
            this.isDisabled = true
            this.$v.$touch();
            if (!this.$v.$invalid && !this.isMatchPassword) {
                const payload = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword,
                    terms: 'on',
                    baseDomain: 'customer',
                }
                this.$store.dispatch('auth/register', payload)
               .then(response => {
                   if(response.data.status) {
                    alert('A verfication email has been sent to you please confirm it from your Inbox')
                    this.$router.push('/account/login');
                   }
               })
               .catch(error => {
                   this.backendErrors = error.response.data.errors
                   console.log(this.backendErrors)
                })
                .catch(() => {
                   this.isDisabled = false

                })
                // this.$router.push('/account/login');
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
