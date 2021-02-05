module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQtd = oldCart.totalQtd || 0;
    this.totalPreco = oldCart.totalPreco || 0;

    //adicionar item
    this.add = function (item, id)  {
        let storedItem = this.items[id];
        if(!storedItem) {
        storedItem = this.items[id] = {item:item, qtd:0, preco: 0};
        }

        storedItem.qtd++;
        storedItem.preco = storedItem.item.preco * storedItem.qtd;
        this.totalQtd++;
        this.totalPreco += storedItem.item.preco;
    }



    //Aumentar item do carro
    this.increase = function(id) {
        this.items[id].qtd++;
        this.items[id].preco += this.items[id].item.preco;
        this.totalQtd++;
        this.totalPreco += this.items[id].item.preco;
    };    

    //Reduzir item do carro
    this.reduceOne = function(id) {
        this.items[id].qtd--;
        this.items[id].preco -= this.items[id].item.preco;
        this.totalQtd--;
        this.totalPreco -= this.items[id].item.preco;
        if (this.items[id].qtd <= 0) {
            delete this.items[id];

        }
    };

    //Romover item por completo
    this.removeAll = function(id) {
    this.totalQtd -= this.items[id].qtd;
    this.totalPreco -= this.items[id].preco;
    delete this.items[id];

    };


    //lista de itens adicionados ao Cart
    this.generateArray = function ()  {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id])
        }
        return arr;
    }
};