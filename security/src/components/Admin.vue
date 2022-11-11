<template>
    <div >
    <div v-if="!isInDanger" class="container-fluid p-0">
        <div class="row">

            <div class="col-md-2">
                <div class="sidebar">
                    <div class="admin">
                        <img src="../assets/images/avatar-05.png" class="avatar-img">
                        <h5>Leapbit</h5>
                        <h6>info@leapbit.com</h6>
                    </div>
                    <div class="navigation">
                        <div class="nav-item">
                            <img src="../assets/images/icon-dashboard.svg">
                            <p>Dashboard</p>
                        </div>
                        <div class="nav-item">
                            <img src="../assets/images/icon-chat.svg">
                            <p>Chat</p>
                        </div>
                        <div class="nav-item">
                            <img src="../assets/images/icon-users.svg">
                            <p>Users</p>
                        </div>
                        <div class="nav-item">
                            <img src="../assets/images/icon-settings.svg">
                            <p>Settings</p>
                        </div>
                    </div>
                    <div class="bottom-nav">
                        <div class="nav-item">
                            <img src="../assets/images/icon-logout.svg">
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-12 vh-header">
                        <div class="col-md-4">
                            <div class="title-new">
                                <h2>Messages</h2>
                            </div>

                            <div class="chats-list">
                                <!--eslint-disable-next-line vue/no-v-for-template-key -->
                                <template v-for="(chat, chatIndex) of chatList" :key="chatIndex">
                                    <div class="chat-single">
                                        <div class="chat-top">
                                            <div class="chat-sender">
                                                <img src="../assets/images/avatar-01.png" class="avatar-img">
                                                <div class="name-mail">
                                                    <h3>{{ chat.nameLastName }}</h3>
                                                    <h4>{{ chat.email }}</h4>
                                                </div>
                                            </div>
                                            <p class="time">{{ chat.timestamp }}</p>
                                        </div>
                                        <div class="chat-bottom">
                                            <p class="message-preview"> {{ chat.messages[chat.messages.length - 1].msg }}</p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <IndividualChatWin :chat="selectedChat" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>


<script scoped>
import IndividualChatWin from './IndividualChatWin.vue';
export default {

    name: 'AdminWin',
    props: {
        isInDanger: Boolean
    },
    data()
    {
        return {
            toggleDanger: this.danger,
            chatList: 
                [
                    {
                        chatId: 0,
                        nameLastName: 'John Doe',
                        email: 'john.doe@leapbit.com',
                        messages: [
                            {
                                msg: 'Hello, please help! My Internet is not working!',
                                timestamp: '11/11/2022',
                                admin: false
                            },
                            {
                                msg: 'Hello, did you try turning it off and on again?',
                                timestamp: '11/11/2022',
                                admin: true
                            },
                            {
                                msg: 'It works now! Thank you!',
                                timestamp: '11/11/2022',
                                admin: false
                            }
                        ],
                        timestamp: '11/11/2022',
                    },
                    {
                        chatId: 1,
                        nameLastName: 'Mary Jane',
                        email: 'mary.jane@leapbit.com',
                        messages: [
                            {
                                msg: 'How are you doing today?',
                                timestamp: '11/11/2022',
                                admin: false
                            }
                        ],
                        timestamp: '11/11/2022',
                    },
                    {
                        chatId: 2,
                        nameLastName: 'Hrvoje Hrvatko',
                        email: 'hrvoje.hrvatko@leapbit.com',
                        messages: [
                            {
                                msg: 'We are glad to help!',
                                timestamp: '10/11/2022',
                                admin: true
                            }
                        ],
                        timestamp: '10/11/2022',
                    },

                ],
            selectedChat: {
                        chatId: 0,
                        nameLastName: 'John Doe',
                        email: 'john.doe@leapbit.com',
                        messages: [
                            {
                                msg: 'Hello, please help! My Internet is not working!',
                                timestamp: '11/11/2022',
                                admin: false
                            },
                            {
                                msg: 'Hello, did you try turning it off and on again?',
                                timestamp: '11/11/2022',
                                admin: true
                            },
                            {
                                msg: 'It works now! Thank you!',
                                timestamp: '11/11/2022',
                                admin: false
                            }
                        ],
                        timestamp: '11/11/2022',
                    },
            selectedChatId: null
        };
    },
    components: {
        IndividualChatWin 
     },
}
</script>