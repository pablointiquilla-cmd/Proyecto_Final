/* ==========================================================================
   DESAFÍO FINAL: PROGRAMACIÓN WEB I - LÓGICA DE SIMULADORES (js/script.js)
   Modelos Matemáticos Aplicados al Contexto de Crisis
   ========================================================================== */

// Esperamos a que todo el DOM esté completamente cargado antes de ejecutar
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // ESCENARIO A: Simulador de Abastecimiento de Carburantes
    // ==========================================================================
    const btnCalcularA = document.getElementById("btn-calcular-a");
    if (btnCalcularA) {
        btnCalcularA.addEventListener("click", () => {
            // 1. Captura de datos mediante el DOM 
            const cantInicial = parseFloat(document.getElementById("cant-inicial").value);
            const consumoDiario = parseFloat(document.getElementById("consumo-diario").value);
            const reabastecimiento = parseFloat(document.getElementById("reabastecimiento").value);
            const nivelCritico = parseFloat(document.getElementById("nivel-critico").value);
            const contenedorResultado = document.getElementById("resultado-carburantes");

            // 2. Validación de campos vacíos o incorrectos 
            if (isNaN(cantInicial) || isNaN(consumoDiario) || isNaN(reabastecimiento) || isNaN(nivelCritico)) {
                mostrarMensajeError(contenedorResultado, "Por favor, complete todos los campos numéricos.");
                return;
            }
            if (cantInicial < 0 || consumoDiario < 0 || reabastecimiento < 0 || nivelCritico < 0) {
                mostrarMensajeError(contenedorResultado, "Los valores no pueden ser negativos.");
                return;
            }

            // 3. Procesamiento y Simulación Matemática [cite: 192, 196]
            let reservaActual = cantInicial;
            let dias = 0;
            let llegoAlCritico = false;
            let diaCritico = 0;

            // Evitamos bucles infinitos si el reabastecimiento supera o iguala al consumo
            const limiteDiasMaximo = 365; 

            while (reservaActual > 0 && dias < limiteDiasMaximo) {
                // Modelo matemático: Reserva final = inicial + reabastecimiento - consumo 
                reservaActual = reservaActual + reabastecimiento - consumoDiario;
                dias++;

                // Evaluar si cae por debajo del nivel crítico [cite: 49]
                if (reservaActual <= nivelCritico && !llegoAlCritico) {
                    llegoAlCritico = true;
                    diaCritico = dias;
                }

                // Si el consumo es menor o igual al reabastecimiento, la reserva nunca bajará
                if (consumoDiario <= reabastecimiento && reservaActual >= cantInicial) {
                    break;
                }
            }

            // 4. Inyección de resultados en el DOM cambiando estilos dinámicamente [cite: 192, 195]
            if (consumoDiario <= reabastecimiento) {
                contenedorResultado.className = "resultado-exito";
                contenedorResultado.innerHTML = `
                    <h3>Estabilidad del Suministro</h3>
                    <p>El reabastecimiento diario (<strong>${reabastecimiento} L</strong>) cubre o supera el consumo estimado (<strong>${consumoDiario} L</strong>).</p>
                    <p><strong>Interpretación:</strong> La estación de servicio es autosostenible bajo este ritmo de consumo y las reservas no peligran.</p>
                `;
            } else {
                contenedorResultado.className = "resultado-alerta"; // Cambio de estilo dinámico 
                let mensajeHTML = `<h3>Alerta de Autonomía de Reserva</h3>`;
                
                if (llegoAlCritico) {
                    mensajeHTML += `<p>⚠️ La reserva alcanzará el <strong>Nivel Crítico (${nivelCritico} L)</strong> en el <strong>Día ${diaCritico}</strong>.</p>`;
                }
                
                if (reservaActual <= 0) {
                    mensajeHTML += `<p>❌ <strong>Desabastecimiento Total:</strong> Las reservas se agotarán por completo en el <strong>Día ${dias}</strong>.</p>`;
                } else {
                    mensajeHTML += `<p>La reserva continuará disminuyendo progresivamente más allá de los límites analizados.</p>`;
                }
                
                contenedorResultado.innerHTML = mensajeHTML; // Salida en pantalla [cite: 192, 208]
            }
        });
    }

    // ==========================================================================
    // ESCENARIO B: Simulador de Precios de Alimentos
    // ==========================================================================
    const btnCalcularB = document.getElementById("btn-calcular-b");
    if (btnCalcularB) {
        btnCalcularB.addEventListener("click", () => {
            const producto = document.getElementById("producto").value.trim();
            const precioInicial = parseFloat(document.getElementById("precio-inicial").value);
            const precioActual = parseFloat(document.getElementById("precio-actual").value);
            const cantSemana = parseFloat(document.getElementById("cantidad-semana").value);
            const semanas = parseInt(document.getElementById("semanas").value);
            const contenedorResultado = document.getElementById("resultado-alimentos");

            if (!producto || isNaN(precioInicial) || isNaN(precioActual) || isNaN(cantSemana) || isNaN(semanas)) {
                mostrarMensajeError(contenedorResultado, "Por favor, complete todos los campos solicitados.");
                return;
            }
            if (precioInicial <= 0 || precioActual < 0 || cantSemana < 0 || semanas < 1) {
                mostrarMensajeError(contenedorResultado, "Ingrese cantidades lógicas mayores a cero.");
                return;
            }

            // Modelos Matemáticos Requeridos 
            const incrementoPrecio = precioActual - precioInicial;
            const porcentajeAumento = (incrementoPrecio / precioInicial) * 100;
            const gastoSemanalAnterior = precioInicial * cantSemana;
            const gastoSemanalActual = precioActual * cantSemana;
            const gastoTotalAnterior = gastoSemanalAnterior * semanas;
            const gastoTotalActual = gastoSemanalActual * semanas;
            const diferenciaGasto = gastoTotalActual - gastoTotalAnterior;

            contenedorResultado.className = "resultado-alerta";
            contenedorResultado.innerHTML = `
                <h3>Impacto Inflacionario: ${producto}</h3>
                <p>El incremento neto por unidad es de <strong>${incrementoPrecio.toFixed(2)} Bs</strong>, representando un aumento del <strong style="color:var(--alerta-critica);">${porcentajeAumento.toFixed(1)}%</strong>.</p>
                <hr style="border:0; border-top:1px solid var(--glass-border); margin:10px 0;">
                <p>• Gasto acumulado antes: <strong>${gastoTotalAnterior.toFixed(2)} Bs</strong></p>
                <p>• Gasto acumulado actual: <strong>${gastoTotalActual.toFixed(2)} Bs</strong></p>
                <p><strong>Diferencia / Gasto Extra:</strong> La familia debe desembolsar <strong>${diferenciaGasto.toFixed(2)} Bs adicionales</strong> para adquirir la misma cantidad de alimentos durante este periodo[cite: 71].</p>
            `;
        });
    }

    // ==========================================================================
    // ESCENARIO C: Simulador de Costo de Transporte
    // ==========================================================================
    const btnCalcularC = document.getElementById("btn-calcular-c");
    if (btnCalcularC) {
        btnCalcularC.addEventListener("click", () => {
            const distNormal = parseFloat(document.getElementById("distancia-normal").value);
            const distDesvio = parseFloat(document.getElementById("distancia-desvio").value);
            const costoKm = parseFloat(document.getElementById("costo-km").value);
            const viajesSemana = parseInt(document.getElementById("viajes-semana").value);
            const contenedorResultado = document.getElementById("resultado-transporte");

            if (isNaN(distNormal) || isNaN(distDesvio) || isNaN(costoKm) || isNaN(viajesSemana)) {
                mostrarMensajeError(contenedorResultado, "Por favor, llene todos los parámetros de transporte.");
                return;
            }
            if (distNormal < 0 || distDesvio < 0 || costoKm < 0 || viajesSemana < 0) {
                mostrarMensajeError(contenedorResultado, "Los valores viales no pueden ser negativos.");
                return;
            }

            // Modelos Matemáticos 
            const costoNormalViaje = distNormal * costoKm;
            const costoDesvioViaje = distDesvio * costoKm;
            const costoAdicionalViaje = (distDesvio - distNormal) * costoKm; // [cite: 196]
            
            const gastoExtraSemanal = costoAdicionalViaje * viajesSemana; // [cite: 85]
            const gastoExtraMensual = gastoExtraSemanal * 4; // [cite: 85]

            if (distDesvio > distNormal) {
                contenedorResultado.className = "resultado-alerta";
                contenedorResultado.innerHTML = `
                    <h3>Análisis de Costos de Traslado</h3>
                    <p>Tomar la ruta alternativa genera una desviación extra de <strong>${(distDesvio - distNormal).toFixed(1)} km</strong> por viaje.</p>
                    <p>⚠️ <strong>Pérdida Semanal Adicional:</strong> +${gastoExtraSemanal.toFixed(2)} Bs [cite: 85]</p>
                    <p>⚠️ <strong>Pérdida Mensual Proyectada:</strong> +${gastoExtraMensual.toFixed(2)} Bs [cite: 85]</p>
                    <p><em>Interpretación: El bloqueo vial incrementa sustancialmente el desgaste vehicular y los costes operativos del operador o usuario[cite: 87].</em></p>
                `;
            } else {
                contenedorResultado.className = "resultado-exito";
                contenedorResultado.innerHTML = `
                    <h3>Operación en Ruta Normal</h3>
                    <p>La distancia con desvío no supera a la ruta habitual. El gasto se mantiene estable según el presupuesto base preestablecido.</p>
                `;
            }
        });
    }

    // ==========================================================================
    // ESCENARIO D: Simulador de Compras Familiares
    // ==========================================================================
    const btnCalcularD = document.getElementById("btn-calcular-d");
    if (btnCalcularD) {
        btnCalcularD.addEventListener("click", () => {
            const presupuesto = parseFloat(document.getElementById("presupuesto").value);
            const costoTotalCompra = parseFloat(document.getElementById("costo-total-compra").value);
            const contenedorResultado = document.getElementById("resultado-compras");

            if (isNaN(presupuesto) || isNaN(costoTotalCompra)) {
                mostrarMensajeError(contenedorResultado, "Complete los montos presupuestarios financieros.");
                return;
            }
            if (presupuesto < 0 || costoTotalCompra < 0) {
                mostrarMensajeError(contenedorResultado, "Los montos económicos no pueden ser negativos.");
                return;
            }

            // Cálculos matemáticos [cite: 97-99]
            const saldoRestante = presupuesto - costoTotalCompra; // [cite: 98]
            
            // Clasificación porcentual del nivel de gasto según exigencia del documento [cite: 100]
            let clasificacionGasto = "";
            const porcentajeUso = (costoTotalCompra / presupuesto) * 100;

            if (porcentajeUso <= 50) {
                clasificacionGasto = "<span style='color:var(--verde-brillante); font-weight:bold;'>BAJO</span>";
            } else if (porcentajeUso <= 100) {
                clasificacionGasto = "<span style='color:var(--verde-acento); font-weight:bold;'>MEDIO</span>";
            } else {
                clasificacionGasto = "<span style='color:var(--alerta-critica); font-weight:bold;'>ALTO (Excedido)</span>";
            }

            // Visualización dinámica en pantalla [cite: 102, 195]
            if (saldoRestante >= 0) {
                contenedorResultado.className = "resultado-exito";
                contenedorResultado.innerHTML = `
                    <h3>Estatus del Presupuesto: ✅ ALCANZA</h3>
                    <p>El presupuesto familiar logra cubrir perfectamente el total de la compra[cite: 102].</p>
                    <p>• Saldo Restante a favor: <strong>${saldoRestante.toFixed(2)} Bs</strong> [cite: 98]</p>
                    <p>• Clasificación de la magnitud del gasto: ${clasificacionGasto} [cite: 100]</p>
                `;
            } else {
                contenedorResultado.className = "resultado-alerta";
                const montoFaltante = Math.abs(saldoRestante); // [cite: 99]
                contenedorResultado.innerHTML = `
                    <h3>Estatus del Presupuesto: ❌ INSUFICIENTE</h3>
                    <p>La lista de compras excede la liquidez monetaria disponible de la familia[cite: 102].</p>
                    <p style="color:var(--alerta-critica);">• <strong>Monto Faltante (Déficit):</strong> -${montoFaltante.toFixed(2)} Bs [cite: 99]</p>
                    <p>• Clasificación de la magnitud del gasto: ${clasificacionGasto} [cite: 100]</p>
                `;
            }
        });
    }

    // ==========================================================================
    // ESCENARIO E: Simulador de Rumor de Escasez y Compras por Pánico
    // ==========================================================================
    const btnCalcularE = document.getElementById("btn-calcular-e");
    if (btnCalcularE) {
        btnCalcularE.addEventListener("click", () => {
            const demandaNormal = parseFloat(document.getElementById("demanda-normal").value);
            const porcentajeRumor = parseFloat(document.getElementById("porcentaje-rumor").value);
            const stockDisponible = parseFloat(document.getElementById("stock-disponible").value);
            const contenedorResultado = document.getElementById("resultado-escasez");

            if (isNaN(demandaNormal) || isNaN(porcentajeRumor) || isNaN(stockDisponible)) {
                mostrarMensajeError(contenedorResultado, "Complete todas las variables de inventario demandado.");
                return;
            }
            if (demandaNormal < 0 || porcentajeRumor < 0 || stockDisponible < 0) {
                mostrarMensajeError(contenedorResultado, "Los valores de stock/demanda no pueden ser negativos.");
                return;
            }

            // Modelos Matemáticos Aplicados 
            // Nueva demanda = demanda normal + demanda normal * porcentaje de aumento 
            const aumentoUnidades = demandaNormal * (porcentajeRumor / 100);
            const nuevaDemanda = demandaNormal + aumentoUnidades; // [cite: 196]
            const diferenciaDemanda = nuevaDemanda - demandaNormal; // [cite: 112]
            const stockRestante = stockDisponible - nuevaDemanda; // [cite: 113]

            if (nuevaDemanda > stockDisponible) {
                contenedorResultado.className = "resultado-alerta"; // Alerta visual 
                contenedorResultado.innerHTML = `
                    <h3>🚨 Colapso de Inventario (Desabastecimiento Colectivo)</h3>
                    <p>El pánico generado por rumores disparó la demanda en un <strong>+${porcentajeRumor}%</strong>, elevándola a <strong>${nuevaDemanda.toFixed(0)} unidades</strong>[cite: 116].</p>
                    <p>❌ <strong>Déficit en Mercado:</strong> La demanda supera al stock por <strong>${Math.abs(stockRestante).toFixed(0)} unidades</strong>[cite: 114].</p>
                    <p><strong>Conclusión del Escenario:</strong> El rumor provocó una escasez artificial inducida por el comportamiento irracional del consumidor[cite: 116].</p>
                `;
            } else {
                contenedorResultado.className = "resultado-exito";
                contenedorResultado.innerHTML = `
                    <h3>Inventario bajo Control (Resistente)</h3>
                    <p>A pesar del incremento de la demanda provocado por el pánico (<strong>${nuevaDemanda.toFixed(0)} unidades</strong>), el almacén tiene suficiente capacidad[cite: 116].</p>
                    <p>• Stock remanente de seguridad en estantes: <strong>${stockRestante.toFixed(0)} unidades</strong> [cite: 113]</p>
                `;
            }
        });
    }

    // ==========================================================================
    // FUNCIÓN AUXILIAR: Mensajes de Error Uniformes
    // ==========================================================================
    function mostrarMensajeError(contenedor, mensaje) {
        contenedor.className = "resultado-alerta";
        contenedor.innerHTML = `<p style="color: var(--alerta-critica); font-weight:600;">⚠️ Error: ${mensaje}</p>`;
    }
});