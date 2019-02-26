<template>
    <div class="login-page">
        <div class="login-page-content">
            <el-form @submit.prevent.native="onSubmit('form')" :model="form" :rules="rules" status-icon ref="form" label-width="80px">
                <el-form-item label="Email" prop="username">
                    <div class="row">
                        <div class="col-lg-12">
                            <el-input v-model="form.username" ref="username" autocomplete="off"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <div class="row">
                        <div class="col-lg-12">
                            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="align-right">
                        <el-button native-type="submit" type="primary" :loading="false" plain v-loading.fullscreen.lock="fullscreenLoading">Sign in</el-button>
                    </div>
                </el-form-item>
            </el-form>
        <router-link to="/registration">Registracija</router-link>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Login',
  metaInfo: {
    title: 'Login'
  },
  data () {
    return {
      fullscreenLoading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please enter email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter correct email address', trigger: ['blur'] }
        ],
        password: [
          { required: true, message: 'Please enter password', trigger: ['blur'] }
        ]
      }
    }
  },
  mounted () {
    let self = this
    if (self.$store.state.isAuthenticated) {
      self.$router.push('/dashboard')
    } else {
      self.$refs.username.focus()
    }
  },
  methods: {
    onSubmit (formName) {
      let self = this
      self.fullscreenLoading = true
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$store.dispatch('login', { data: self.form })
            .then((response) => {
              self.loadProfile().then(() => {
                self.fullscreenLoading = false
                self.$router.go('/dashboard')
              })
            }).catch(() => {
              self.fullscreenLoading = false
              self.$notify({
                title: 'Greška',
                message: 'Logovanje nije uspelo, pokušajte ponovo.',
                type: 'error',
                position: 'bottom-right',
                duration: 2500
              })
            })
        }
      })
    },
    loadProfile () {
      return this.$api({
        method: 'POST',
        url: '/users/profile'
      })
        .then(response => {
          if (window.localStorage) {
            window.localStorage.setItem('user', JSON.stringify(response.data))
          }
          this.$store.commit('SET_USER', response.data)
        })
    }
  }
}
</script>
