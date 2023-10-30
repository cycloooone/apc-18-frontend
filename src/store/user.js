import axios from 'axios'
export default {
    state (){
        return {
            tableData: [],
        }
    },
    mutations: {
        setTableData(state, value){
            if(value){
                state.tableData = value
            }
            
        },
    },
    actions: {
        async GET_USERS( {commit}){

                let data = await axios.get("http://localhost:3000/users");
                console.log(data.data.rows)
                if(!this.USERS){
                    commit("setTableData", data.data.rows)
                }
                
        }
    },
    getters: {
        USERS(state){
            return state.tableData
        }
    }

    
}