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
      
    //   function changeContentOnResize() {
    //     let firstCarousel = document.getElementById('firstCarousel');
    //     let secondCarousel = document.getElementById('secondCarousel');
    //     let screenWidth = window.innerWidth;

    //     if (screenWidth <= 768) {
    //         firstCarousel.innerHTML = '<div class="video-container"> <video class="fullscreen-video" autoplay muted loop playsinline> <source src="assets/images/promoVid.mp4" type="video/mp4"> Tu navegador no soporta el tag de video. </video> <div class="overlay-text"> <h1 style="color: white" >CAP Oriente</h1> <p style="color: white" >Tu socio estratégico en el mundo de las importaciones...</p> <a href="#aboutUs" class="main-btn rounded-one">Saber Más</a> </div> </div>';
    //         secondCarousel.innerHTML = '<div class="video-container"> <video class="fullscreen-video" autoplay muted loop playsinline> <source src="assets/images/promoVid.mp4" type="video/mp4"> Tu navegador no soporta el tag de video. </video> <div class="overlay-text"> <h3 style="color: white" >Próximo viaje de capacitación y negocios Abril 2024</h3> <p style="color: white" >Dubai, Shanghai, Yiwu, Cantón, Tailandia.</p> <a href="#nextTrip" class="main-btn rounded-one">Saber Más</a> </div> </div>';
    //       }
    //     else {
    //       firstCarousel.innerHTML = '<div class="container"> <div class="row"> <div class="col-lg-6"> <div class="slider-content"> <h1 class="title">CAP Oriente</h1> <p class="text">Tu socio estratégico en el mundo de las importaciones. Nos destacamos por simplificar el proceso de importación y ofrecer soluciones innovadoras respaldadas por una experiencia de más de 10 años en el rubro.</p> <ul class="slider-btn rounded-buttons"> <li><a class="main-btn rounded-one" href="#aboutUs">Saber Más</a></li> </ul> </div> </div> </div> </div> <div class="slider-image-box d-none d-lg-flex align-items-center"> <div class="slider-image"> <div> <video width="300" height="600" autoplay muted loop playsinline> <source src="assets/images/promoVid.mp4" type="video/mp4"> Tu navegador no soporta el video. </video> </div> </div> </div>';
    //       secondCarousel.innerHTML = '<div class="container"> <div class="row"> <div class="col-lg-6"> <div class="slider-content"> <h1 class="title">Próximo viaje de capacitación y negocios Abril 2024</h1> <p class="text">Dubai, Shanghai, Yiwu, Cantón, Tailandia.</p> <ul class="slider-btn rounded-buttons"> <li><a class="main-btn rounded-one" href="#nextTrip">Saber Más</a></li> </ul> </div> </div> </div> </div> <div class="slider-image-box d-none d-lg-flex align-items-center"> <div class="slider-image" style="margin-left: 5rem;"> <div> <video width="300" height="600" autoplay muted loop playsinline> <source src="assets/images/promoVid.mp4" type="video/mp4"> Tu navegador no soporta el video. </video> </div> </div> </div>';
    //   }
    // }
    // window.onload = changeContentOnResize;
    // window.onresize = changeContentOnResize;

    function downloadPDF() {
      const rutaImagen = '/assets/images/files/brochure.pdf';

      const enlaceTemporal = document.createElement('a');
      enlaceTemporal.href = rutaImagen;
      enlaceTemporal.download = 'Brochure'; // Puedes cambiar el nombre de la descarga
      enlaceTemporal.target = '_blank';

      document.body.appendChild(enlaceTemporal);

      // Simula un clic en el enlace temporal para iniciar la descarga
      enlaceTemporal.click();

      // Elimina el enlace temporal del DOM
      document.body.removeChild(enlaceTemporal);
    }
 async function indicators() {
  let serverRequest = await fetch('https://mindicador.cl/api');
  let serverResponse = await serverRequest.json(); console.log(serverResponse);
  let codes = ['dolar', 'euro', 'imacec', 'ipc', 'uf', 'utm'];
  // const arrayFiltrado = arrayDeObjetos.filter(a => codes.includes(a.codigo));

  let data = Object.values(serverResponse).filter(a => codes.includes(a.codigo)).map(a => {
    return {Nombre: a.codigo, Valor: a.valor}
  });
  const tickerList = document.getElementById('ticker-list');
  tickerList.innerHTML = '';
  data.forEach(dato => {
    const listItem = document.createElement('li');
    listItem.textContent = `${dato.Nombre.toUpperCase()}: ${dato.Valor}`;
    tickerList.appendChild(listItem);
  });

 }
 indicators();
