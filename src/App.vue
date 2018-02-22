<template>
    <div id="app">
        <nav class="nav" tabindex="-1" onclick="this.focus()">
            <div class="container">
                <router-link v-on:click.native="clearMessages" to="/" class="pagename current">Benchly</router-link>
                <router-link v-on:click.native="clearMessages" to="/workflows">Workflows</router-link>
                <router-link v-on:click.native="clearMessages" to="/jobs">Jobs</router-link>
                <router-link v-on:click.native="clearMessages" to="/resources">Resources</router-link>
                <router-link v-on:click.native="clearMessages" to="/manage">Manage</router-link>
                |&nbsp;&nbsp;&nbsp;
                <span v-if="user">
                    <router-link v-on:click.native="clearMessages" :to="userRoute(user)">{{user.name}}</router-link>
                    <a href="#" v-on:click="doLogout">Logout</a>
                </span>
                <router-link v-else v-on:click.native="clearMessages" to="/login">Login</router-link>
            </div>
        </nav>

        <div class="container">
            <div id="user-messages">
                <div v-for="message in messages" :class="['msg', message.type.toLowerCase()]">
                    {{ message.text }}
                </div>
            </div>

            <router-view
                v-on:userlogin="setUser"
                v-on:newmessages="addMessages">
                <!-- Main content -->
            </router-view>
        </div>
    </div>
</template>

<script>
import Api from './api.js'
import BlyUtil from './util.js'
import UserMessage from './models/UserMessage.js'

export default {
    name: 'app',
    data () {
        return {
            user: null,
            messages: []
        }
    },
    created: function() {
        // on app startup check if we have a session cookie and get the
        // user if this is so
        const cookie = this.getSessionCookie()
        const self = this
        if (!!cookie) {
            Api.getSession(this, function(data) {
                self.setUser(data.body.content);
            })
        }
    },
    methods: {
        setUser: function(user) {
            this.user = user
        },
        // TODO: Yeah, this should be done better somehow...
        userRoute: function(user) {
            return "/users/" + user.id
        },
        getSessionCookie: function() {
            return BlyUtil.getCookie('JSESSIONID')
        },
        removeSessionCookie: function() {
            BlyUtil.expireCookie('JSESSIONID')
        },
        doLogout: function() {
            const self = this
            Api.deleteSession(this, function() {
                self.setUser(null)
                self.removeSessionCookie()
                self.clearMessages()
                self.addMessage(UserMessage.ok("You have been logged out."))
                self.$router.push('/login')
            }, function() {
                // use a custom callbock, because those $emitted by Api won't register
                // with the global component
                self.addMessage(UserMessage.error("Unexpected error on user logout."))
            })
        },
        addMessage: function(msg) {
            this.messages.push(msg)
        },
        addMessages: function(messages) {
            if (!BlyUtil.isArray(messages)) {
                return
            }
            for (let i = 0; i < messages.length; i++) {
                this.addMessage(messages[i])
            }
        },
        clearMessages: function() {
            this.messages.splice(0)
        }
    }
}
</script>

<style>
#user-messages > .msg {
    width: 80%;
    margin: 1.5em 0 1.5em;
}



#user-messages > .ok {
    border-color: #2d2;
    background: #dfd;
}
#user-messages > .warn {
    border-color: #f0ad4e;
    background: #faebcc; /* fcf8e3 */
}
#user-messages > .info {
    /* use standard */
}
#user-messages > .error {
    border-color: #e44;
    background: #fdd
}

/* The css framework we use */
@import './assets/mincss.min.css'
</style>
