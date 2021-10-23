var mp = new MercadoPago('TEST-a82c7392-8732-4670-abdf-f1e37a2d442c', {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});
// Handle call to backend and generate preference.
var click = document.getElementById("mercadopago-button")
console.log(click)
if (click) {
    click.addEventListener("click", function() {

        $('mercadopago-button').attr("disabled", true);

        const orderData = {

            prodSku: document.getElementById("sku").innerHTML,
            prodName: document.getElementById("name").innerHTML,
            unit_price: 1,
            quantity: 1,
        };

        fetch("http://localhost:9099/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(preference) {
                console.log(preference)
                createCheckoutButton(preference.id);

                /* $(".shopping-cart").fadeOut(500);
                 setTimeout(() => {
                     $(".container_payment").show(500).fadeIn();
                 }, 500);*/
            })
            .catch(function() {
                alert("Unexpected error");
                $('#checkout-btn').attr("disabled", false);
            });
    });

    // Create preference when click on checkout button
    function createCheckoutButton(preferenceId) {
        // Initialize the checkout
        $('mercadopago-button').attr("disabled", true);
        mp.checkout({
            preference: {
                id: preferenceId
            },
            render: {
                container: '#mercadopago-button', // Class name where the payment button will be displayed
                label: 'Pagar', // Change the payment button text (optional)
            }
        });
    }

    // Handle price update
    /*function updatePrice() {
        let quantity = document.getElementById("quantity").value;
        let unitPrice = document.getElementById("unit-price").innerHTML;
        let amount = parseInt(unitPrice) * parseInt(quantity);

        //  document.getElementById("cart-total").innerHTML = "$ " + amount;
        //  document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
        //document.getElementById("summary-quantity").innerHTML = quantity;
        document.getElementById("summary-total").innerHTML = "$ " + amount;
    }

    document.getElementById("quantity").addEventListener("change", updatePrice);
    updatePrice();*/

    // Go back
    document.getElementById("go-back").addEventListener("click", function() {
        $(".container_payment").fadeOut(500);
        setTimeout(() => {
            $(".shopping-cart").show(500).fadeIn();
        }, 500);
        $('#checkout-btn').attr("disabled", false);
    });
}