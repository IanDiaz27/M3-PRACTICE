
var model = {
    clients:{},
    reset: function(){
        this.clients = {}
    },
    addAppointment: function(client, date){
        date.status = 'pending'
        if(this.clients[client]){
            this.clients[client].push(date)
        }
        else{
            this.clients[client] = [date]
        }
    },
    attend: function(name, date){
        for (i = 0; i < this.clients[name].length; i++) {
            if (this.clients[name][i].date === date) {
                this.clients[name][i].status = 'attended'  
            }
        }
    },
    expire: function(name, date){
        for(i = 0; i < this.clients[name].length; i++) {
            if(this.clients[name][i].date === date) {
                this.clients[name][i].status = 'expired' 
            }
        }
    },
    cancel: function(name, date){
        for(i = 0; i < this.clients[name].length; i++) {
            if(this.clients[name][i].date === date) {
                this.clients[name][i].status = 'cancelled'
            }
        }
    },
    erase: function(name, date){
        if(date.includes('/')){
            this.clients[name] = this.clients[name].filter(c => c.date !== date)
        }else{
            this.clients[name] = this.clients[name].filter(c => c.status !== date)
        }
    },
    getAppointments: function(name, status){
        if(status){
            return this.clients[name].filter(c => c.status === status)
        }
        return this.clients[name];
    },
    getClients: function(){
        return Object.keys(this.clients)
    }
};

module.exports = {model}