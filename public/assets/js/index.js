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

                cardFormData.transaction_amount = parseInt(document.getElementById("paymentValueInput").value);
                
                let paymentPending = await fetch("http://localhost:4000/process_payment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(cardFormData)
                });
                let serverResponse = await paymentPending.json();
                if (serverResponse === 'approved') {
                  document.getElementById("cardPaymentBrick_container").style.display = "none";
                  document.getElementById("paymentValueForm").style.display = "none";
                  document.getElementById("successPaymentDiv").style.display = "block";
                }
              },
              onError: (error) => {
                document.getElementById("cardPaymentBrick_container").style.display = "none";
                document.getElementById("paymentValueForm").style.display = "none";
                document.getElementById("errorPaymentDiv").style.display = "block";
            },
            },
          };
          window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
        };

        setTimeout(() => {
            renderCardPaymentBrick(bricksBuilder);
        }, 1500);


      //   document.getElementById('sendContactMessage').addEventListener('click', async () => {
      //     event.preventDefault();
      //     let contactName = document.getElementById('contactName').value;
      //     let contactEmail = document.getElementById('contactEmail').value;
      //     let contactMessage = document.getElementById('contactMessage').value;
  
      //     let message = {
      //         name: contactName,
      //         email: contactEmail,
      //         message: contactMessage,
      //     };
          
      //     if (Object.values(message).every(val => val.length > 0)) {
              
      //         let sendMessage = await fetch("/sendMessage", {
      //             method: "POST",
      //             headers: { "Content-Type": "application/json", },
      //             body: JSON.stringify(message)
      //           });
  
      //         let serverResponse = await sendMessage.json(); 
      //     }
      // });

      document.getElementById("closeButton").addEventListener("click", function() {
        document.querySelector(".fixed-box").style.display = "none";
      });
      
      function changeContentOnResize() {
        var myDiv = document.getElementById('firstCarousel');
        var screenWidth = window.innerWidth;

        if (screenWidth <= 768) {
            myDiv.innerHTML = '<div class="video-container"> <video class="fullscreen-video" autoplay muted loop playsinline> <source src="assets/images/promoVid.mp4" type="video/mp4"> Tu navegador no soporta el tag de video. </video> <div class="overlay-text"> <h1 style="color: white" >CAP Oriente</h1> <p style="color: white" >Tu socio estratégico en el mundo de las importaciones...</p> <a href="#aboutUs" class="main-btn rounded-one">Saber Más</a> </div> </div>';
        }
        else {
          myDiv.innerHTML = '<div class="container"> <div class="row"> <div class="col-lg-6"> <div class="slider-content"> <h1 class="title">CAP Oriente</h1> <p class="text">Tu socio estratégico en el mundo de las importaciones. Nos destacamos por simplificar el proceso de importación y ofrecer soluciones innovadoras respaldadas por una experiencia de más de 10 años en el rubro.</p> <ul class="slider-btn rounded-buttons"> <li><a class="main-btn rounded-one" href="#aboutUs">Saber Más</a></li> </ul> </div> </div> </div> </div> <div class="slider-image-box d-none d-lg-flex align-items-center"> <div class="slider-image"> <div> <video width="300" height="600" autoplay muted loop playsinline> <source src="assets/images/promoVid.mp4" type="video/mp4"> Tu navegador no soporta el video. </video> </div> </div> </div>';
      }
    }
    window.onload = changeContentOnResize;
    window.onresize = changeContentOnResize;

        
