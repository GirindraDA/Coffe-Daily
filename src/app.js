document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {
                id: 1,
                name: 'Robusta Latte',
                img: '1.jpg',
                price: 20000
            },
            {
                id: 2,
                name: 'Arabica Latte',
                img: '2.jpg',
                price: 22000
            },
            {
                id: 3,
                name: 'Primo Latte',
                img: '3.jpg',
                price: 20000
            },
            {
                id: 4,
                name: 'Green Tea Latte',
                img: '4.jpg',
                price: 24000
            },
            {
                id: 5,
                name: 'Tiramisu Latte',
                img: '5.jpg',
                price: 22000
            },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            //cek apakah ada barang yang sama
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //jika belum ada/ cart masih kosong
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah ada, sek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                    //jika barang berbeda
                    if(item.id !== newItem.id){
                        return item;
                    } else {
                        //jika barang sudah ada, tambah quantity dan sub total!
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id){
            //ambil item yang mau diremove berdasarkan id!
            const cartItem = this.items.find((item) => item.id === id);

           //jika item lebih dari 1
           if(cartItem.quantity > 1){
            //telusuri 1 per satu
            this.items = this.items.map((item) => {
                //jika bukan barang yang di klik
                if(item.id !== id){
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            });
           } else if(cartItem.quantity === 1){
                //jika barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
           }
        }
    });
});


//form validation
const checkoutButton = document.getElementById('checkoutButton');
const form = document.getElementById('checkoutForm');

checkoutButton.disabled = true;

form.addEventListener('keyup', function(){
    for(let i = 0; i < form.elements.length; i++){        
        if(form.elements[i].value.length !== 0){
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

//Kirim data saat button checkout di klik
checkoutButton.addEventListener('click', function(event){
    event.preventDefault();
    const formData = new FormData(form);

    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);

    window.open('http://wa.me/6282324689593?text=' + encodeURIComponent(message));

});

// Format pesan whatsapp
const formatMessage = (obj) => {
    return `
    Data Customer
        Nama: ${obj.name}
        Email: ${obj.email}
        Phone: ${obj.phone}
    Data Order :
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} X ${rupiah(item.total)}) \n`)}
    Total: ${rupiah(obj.total)}.
    Thank You for Your Order.
    `;
}


const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
}