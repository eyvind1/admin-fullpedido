/* sweet alert */
export let Sweetalert = {
  
    fnc:function (type, text, url) {

      switch (type) {
        case "error":
          if (url == null) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: text,
            })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: text
            }).then((result) =>{
              if (result.value) {
                window.open(url,"_top")
              }
            })
          }
          break;
          case "success":
            if (url == null) {
              Swal.fire({
                icon: 'success',
                title: 'Registrado',
                text: text,
              })
            }
            else{
              Swal.fire({
                icon: 'success',
                title: 'Registrado',
                text: text
              }).then((result) =>{
                if (result.value) {
                  window.open(url,"https://fullpedido.com")
                }
              })
            }
            break;

            case "accept":
            if (url == null) {
              Swal.fire({
                icon: 'success',
                title: 'Acepte los términos y Condiciones',
                text: text,
              })
            }
            else{
              Swal.fire({
                icon: 'success',
                title: 'Registrado',
                text: text
              }).then((result) =>{
                if (result.value) {
                  window.open(url,"_top")
                }
              })
            }
            break;
          
            case "loading":
              Swal.fire({
                allowOutsideClick: false,
                type: 'info',
                text: text
              })
              Swal.showLoading()
            break;

            case "close":
              Swal.close()
              break;
      
        default:
          break;
      }
      
    }
}