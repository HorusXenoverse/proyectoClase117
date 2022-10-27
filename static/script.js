var date = new Date()
var display_date = "fecha:" + date.toLocaleDateString()

$(document).ready(function(){

    //console.log('Listo')

    //  Obtén la fecha actual y actualízala en el DOM
    $("#display_date").html(display_date)

    var predicted_emotion

    //  Escribe un evento, cuando se hace clic en el botón eviar.
    $('#predict_button').click(function(){

        //  Obtén el valor del texto, del área de texto, con el método 'val()'.
        let text_value = $("#text").val()

        //  Conviértelo en un objeto JS.
        //  Proporciona una 'clave' aquí y en escribe lo mismo en el archivo app.py; también para extraer los datos.
        let input_text = {'text' : text_value}
        console.log(input_text)

        //  Requerimiento AJAX.
        $.ajax({
            
            url: "/predict-emotion",

            //  Tipo de requerimiento web.
            type : 'POST',

            //  Datos a ser enviados en formato JSON.
            data : JSON.stringify(input_text),

            //  Tipo de respuesta esperada en JSON.
            dataType : 'json',

            //  contentType - (tipo de contenido).
            contentType : 'application/json',

            //  Si todo es exitoso, ejecuta esta función.
            success : function(result){
                let predicted_emotion = result.prediction
                let emo_url = result.url
                $("#prediction").text(predicted_emotion)
                $("#prediction").css("display", "block")
             
                $("#emo_img_url").attr('src', emo_url)
                $("#emo_img_url").css("display", "block")

                // Extrae la predicción y la URL del emoticón del resultado.


                //  Actualiza los elementos del DOM.


                //  Muestra los elementos.

            },

            //  Si hay algún error, ejecuta esta función.
            error : function(result){
                alert(result.responseJSON.message)
                console.log(result)
            }
        })


        //  Borra el cuadro de texto después de cada clic en el botón.
        $('#text').val("")
    })
})