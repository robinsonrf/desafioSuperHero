$(document).ready(function(){

    $("form").submit(function (event) {
        
        event.preventDefault();

        let valueInput = $("#heroeInput").val()
        
        if (isNaN(valueInput) || valueInput <= 0 || valueInput > 731) {
            alert("Deber ser un numero en el rango de 1 - 732")
        }
            else {
        $.ajax({
            url:"https://superheroapi.com/api.php/10220520349773289/"+ valueInput,
            success: function(data){
                let nombre = data.name
                let imagen = data.image.url;
                let conexiones = data.connections['group-affiliation']
                let publicado = data.biography.publisher
                let ocupacion = data.work.occupation
                let primeraAparicion = data.biography['first-appearance']
                let altura = data.appearance.height
                let peso = data.appearance.weight;
                let alianzas = data.biography.aliases

                $("#heroeInfo").html(`
                <div class="card bg-card">
                    <div class="row g-0">
                        <div class="col-12 text-center mx-auto>
                        <h2 class="card-title heroe></h2>
                        <h4 class="card-header heroe p-1">SUPER HEROE ${nombre.toUpperCase()} ENCONTRADO</h4>
                        </div>
                        <div class="col-md-4 m-auto px-auto">
                            <img src="${imagen}" class="img-fluid rounded-start" alt="imagen-heroe">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                
                                <h5 class="card-title text-black">Nombre: ${nombre}</h5>
                                <p class="card-text lh-1"><small class="text-muted">Conexiones: ${conexiones}</small></p>
                                <p class="card-text ms-1 ps-2 m-0 lh-1"><small class="text-muted"><i>Publicado por:</i> ${publicado}</small></p><hr class="m-1">
                                <p class="card-text ms-1 ps-2 m-0 lh-1"><small class="text-muted"><i>Ocupación:</i> ${ocupacion}</small></p><hr class="m-1">
                                <p class="card-text ms-1 ps-2 m-0 lh-1"><small class="text-muted"><i>Primera Aparicion:</i> ${primeraAparicion}</small></p><hr class="m-1">
                                <p class="card-text ms-1 ps-2 m-0 lh-1"><small class="text-muted"><i>Altura:</i> ${altura.join(" - ")}</small></p><hr class="m-1">
                                <p class="card-text ms-1 ps-2 m-0 lh-1"><small class="text-muted"><i>Peso:</i> ${peso.join(" - ")}</small></p><hr class="m-1">
                                <p class="card-text ms-1 ps-2 m-0 lh-1"><small class="text-muted"><i>Alianzas:</i> ${alianzas}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                let grafico = new CanvasJS.Chart("heroeStats", {
                    theme: "light2", 
                    exportEnabled: true,
                    animationEnabled: true,
                    backgroundColor: "#49c2fd",
                    title: {
                        text: "ESTADISTICAS DE PODER PARA " + data.name.toUpperCase(),
                        fontColor: "#fff",
                        fontSize: 20,
                    },
                    exportEnabled: false,
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 14,
                        indexLabel: "{label} - {y}",
                        dataPoints: [
                            { y: data.powerstats.intelligence, label: "Inteligencia" },
                            { y: data.powerstats.strength, label: "Fuerza" },
                            { y: data.powerstats.speed, label: "Velocidad" },
                            { y: data.powerstats.durability, label: "Durabilidad" },
                            { y: data.powerstats.power, label: "Poder" },
                            { y: data.powerstats.combat, label: "Combate" },
                            
                        ]
                    }]
                });
                grafico.render();  
            }
        });

    }
        
    
});

// TRANSITION PARA EL FONDO DEL NAV
$(function (){
    $(window).scroll(function(){
       if ($(this).scrollTop() > 200) {
        $('.navscroll').addClass("azul");
       } else {
        $(".navscroll").removeClass("azul");
       }
    });
});


});