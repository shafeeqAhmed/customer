<template lang="html">
    <div class="ps-page--single">
        <bread-crumb :breadcrumb="breadCrumb" />
            
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
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Verify Email'
                }
            ]
        };
    },
    async fetch() {
            const url = `/email/verify/${this.$route.params.id}/${this.$route.params.hash}?expires=${this.$route.query.expires}&signature=${this.$route.query.signature}`
        Repository
          .post(`${baseUrl}${url}`)
          .then(response => {
           if (response.data.status) {
                alert('Email Verified Successfully!')
                this.$router.push('/account/login');
           } else {
              alert('something going wrong please resend email')
            //   this.$router.push('/email/verify');

           }
          })
          .catch(() => {
              alert('something going wrong please resend email')
          })
    }
};
</script>

<style lang="scss" scoped></style>
