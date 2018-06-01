import mutations from "./Mutation.js"
import actions from "./actions.js"
import vue from "vue"
import vuex from "vuex"
vue.use(vuex);

export default new vuex.Store({
    modules:{
      mutations

    },actions
});


