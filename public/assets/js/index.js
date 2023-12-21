        const mp = new MercadoPago('TEST-085e5a8c-5bde-4e9f-b786-09fb68ee66dd', {
          locale: 'es-CL'
        });
        const bricksBuilder = mp.bricks();
        const renderCardPaymentBrick = async (bricksBuilder) => {
          const settings = {
            initialization: {
              amount: 100, // monto a ser pago
              payer: {
                email: "",
              },
            },
            customization: {
              visual: {
                style: {
                  customVariables: {
                    theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
                  }
                }
              },
                paymentMethods: {
                  maxInstallments: 1,
                }
            },
            callbacks: {
              onReady: () => {
                // callback llamado cuando Brick esté listo
              },
              onSubmit: async (cardFormData) => {
                
                let paymentPending = await fetch("/process_payment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(cardFormData)
                });
                let serverResponse = await paymentPending.json();
                if (serverResponse === 'approved') {
                  document.getElementById("cardPaymentBrick_container").style.display = "none";
                  document.getElementById("successPaymentDiv").style.display = "block";
                }
              },
              onError: (error) => {
                document.getElementById("cardPaymentBrick_container").style.display = "none";
                document.getElementById("errorPaymentDiv").style.display = "block";
            },
            },
          };
          window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
        };

        setTimeout(() => {
            renderCardPaymentBrick(bricksBuilder);
        }, 1500);


        document.getElementById('sendContactMessage').addEventListener('click', async () => {
          event.preventDefault();
          let contactName = document.getElementById('contactName').value;
          let contactEmail = document.getElementById('contactEmail').value;
          let contactMessage = document.getElementById('contactMessage').value;
  
          let message = {
              name: contactName,
              email: contactEmail,
              message: contactMessage,
          };
          
          if (Object.values(message).every(val => val.length > 0)) {
              
              let sendMessage = await fetch("/sendMessage", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", },
                  body: JSON.stringify(message)
                });
  
              let serverResponse = await sendMessage.json(); 
          }
      });
        
