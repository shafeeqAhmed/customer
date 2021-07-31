<template lang="html">
    <div class="ps-page--single">
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-section--custom">
            <div class="container">
                <div class="ps-section__header">
                    <h1>Verify Email</h1>
                </div>
                <div class="ps-section__content">
                    <p>
                       <div class="form-group submit">
                        <button
                            class="ps-btn ps-btn--fullwidth"
                            @click="resendVerificationEmail"
                            :disable="isDisabled"
                        >
                            Resend Email
                        </button>
            </div>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Repository, {
    serializeQuery,
    baseUrl
} from '~/repositories/Repository.js';

export default {
    components: {
        BreadCrumb
    },
    transition: 'zoom',
    data: () => {
        return {
            isDisabled: false,
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Resend Email'
                }
            ]
        };
    },
    methods: {
        resendVerificationEmail() {
            this.isDisabled = true
            // eslint-disable-next-line no-unused-vars
            Repository.post('email/verification-notification').then(response => {
                this.isDisabled = false
                alert(response.data.message)
      })
        .catch(() => {
          this.isDisabled = false
        })
        .then(() => {
          this.isDisabled = false
        })
    },
    },
};
</script>

<style lang="scss" scoped></style>
