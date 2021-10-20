// Add SDK credentials
// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const mercadopago = new MercadoPago('TEST-a82c7392-8732-4670-abdf-f1e37a2d442c', {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});

function MercadopagoComprar() {
    // Handle call to backend and generate preference.
    var click = document.getElementById("checkout-btn")
    console.log(click)
    if (click) {
        click.addEventListener("click", function() {

            $('#checkout-btn').attr("disabled", true);

            const orderData = {
                sku: document.getElementById("sku").innerHTML,
                tittle: document.getElementById("name").innerHTML,
                unit_price: document.getElementById("unit-price").innerHTML,
                quantity: document.getElementById("quantity").value,
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
                    createCheckoutButton(preference.id);

                    $(".shopping-cart").fadeOut(500);
                    setTimeout(() => {
                        $(".container_payment").show(500).fadeIn();
                    }, 500);
                })
                .catch(function() {
                    alert("Unexpected error");
                    $('#checkout-btn').attr("disabled", false);
                });
        });

        // Create preference when click on checkout button
        function createCheckoutButton(preferenceId) {
            // Initialize the checkout
            mercadopago.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '#button-checkout', // Class name where the payment button will be displayed
                    label: 'Pay', // Change the payment button text (optional)
                }
            });
        }

        // Handle price update
        function updatePrice() {
            let quantity = document.getElementById("quantity").value;
            let unitPrice = document.getElementById("unit-price").innerHTML;
            let amount = parseInt(unitPrice) * parseInt(quantity);

            document.getElementById("cart-total").innerHTML = "$ " + amount;
            document.getElementById("summary-price").innerHTML = "$ " + unitPrice;
            document.getElementById("summary-quantity").innerHTML = quantity;
            document.getElementById("summary-total").innerHTML = "$ " + amount;
        }

        document.getElementById("quantity").addEventListener("change", updatePrice);
        updatePrice();

        // Go back
        document.getElementById("go-back").addEventListener("click", function() {
            $(".container_payment").fadeOut(500);
            setTimeout(() => {
                $(".shopping-cart").show(500).fadeIn();
            }, 500);
            $('#checkout-btn').attr("disabled", false);
        });
    }
}