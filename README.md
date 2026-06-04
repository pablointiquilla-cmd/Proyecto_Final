# Simulador Web de Crisis: Abastecimiento, Precios y Consumo Familiar

### Nombre completo: Quilla Apaza P ablo Kevin Inti

### Materia: Programación Web I

### Título del proyecto:Simulador Web de Crisis: Abastecimiento, Precios y Consumo Familiar

### Enlace de la página web: [https://pablointiquilla-cmd.github.io/Proyecto_Final/](https://pablointiquilla-cmd.github.io/Proyecto_Final/)

### Enlace del repositorio Git:[https://github.com/pablointiquilla-cmd/Proyecto_Final.git](https://github.com/pablointiquilla-cmd/Proyecto_Final.git)

Este proyecto es una aplicación web interactiva y educativa diseñada para representar, calcular y analizar de manera matemática diferentes problemáticas socioeconómicas del contexto actual.

El sistema abstrae variables complejas de la realidad (como desabastecimiento, inflación y variaciones logísticas) y las traduce en modelos predictivos visuales para facilitar la toma de decisiones críticas

---

## 📂 Estructura del Proyecto

[cite_start]De acuerdo con las buenas prácticas de la arquitectura limpia en el desarrollo frontend, los recursos del sistema se encuentran estrictamente modularizados y organizados en carpetas independientes[cite: 16, 162, 163]:

```text
PROYECTO FINAL/
│
├── index.html                 # Panel de control principal y presentación del ecosistema
├── css/
│   └── estilos.css            # Hoja de estilos centralizada (Diseño Liquid Glass y Responsivo)
├── js/
│   └── script.js              # Núcleo analítico y motor de manipulación dinámica del DOM
└── pages/                     # Módulos independientes para cada simulación analítica
    ├── escenario-a.html       # Simulador de Abastecimiento de Carburantes
    ├── escenario-b.html       # Simulador de Precios de Alimentos
    ├── escenario-c.html       # Simulador de Costo de Transporte
    ├── escenario-d.html       # Simulador de Compras Familiares
    └── escenario-e.html       # Simulador de Rumores de Escasez y Compras por Pánico
```
---

## 🛠️ Descripción de Módulos y Modelos Matemáticos

Cada simulación captura datos reales mediante formularios validados para procesar algoritmos basados en ecuaciones lineales, porcentajes y estructuras de control iterativas:

1. Panel Principal (index.html)
Actúa como la conserjería central del sistema. Expone de manera clara el contexto del simulador, los objetivos académicos y despliega una cuadrícula adaptativa (grid layout) de tarjetas de acceso directo hacia cada escenario específico.

2. Abastecimiento de Carburantes (pages/escenario-a.html)

Problema: Proyección temporal de inventarios limitados ante dinámicas combinadas de gasto y recarga logística.  

Modelo: Evalúa interactivamente el comportamiento diario a través de la fórmula:
Reserva Final = Reserva Inicial + Reabastecimiento - Consumo  Impacto: Permite predecir con exactitud matemática el día en que las reservas cruzarán el umbral de seguridad crítica o colapsarán por completo.

3. Precios de Alimentos e Inflación (pages/escenario-b.html)

Problema: Medición del impacto inflacionario acumulativo en la canasta familiar básica.  
Modelo: Calcula la tasa de variación porcentual y la brecha financiera nominal de adquisición:
Porcentaje de Aumento = ((Precio Actual - Precio Anterior) / Precio Anterior) * 100  Impacto: Evidencia visualmente la cantidad de presupuesto extra que requiere un núcleo familiar para consumir exactamente los mismos insumos.

4. Costo de Transporte y Desvíos (pages/escenario-c.html)

Problema: Encarecimiento operativo del transporte terrestre debido a bloqueos de rutas o infraestructura deficiente.  
Modelo: Deducción de costos fijos por kilometraje recorrido:
Costo Adicional = (Distancia con Desvío - Distancia Normal) * Costo por Kilómetro  Impacto: Cuantifica pérdidas financieras directas proyectadas a nivel semanal y mensual para el sector transportista o comercial. 

5. Presupuesto y Compras Familiares (pages/escenario-d.html)
Problema: Evaluación de la capacidad real de pago familiar frente a una lista rígida de artículos de primera necesidad.  
Modelo: Deducción aritmética simple y categorización cualitativa del esfuerzo de gasto basado en proporciones porcentuales.  Impacto: Genera alertas inmediatas de suficiencia monetaria indicando el superávit o el déficit financiero exacto de la transacción simulada.

6. Rumores y Compras por Pánico (pages/escenario-e.html)

Problema: Alteraciones artificiales en la demanda agregada provocadas por dinámicas psicológicas colectivas y desinformación.  
Modelo: Proyección lineal de picos de demanda artificiales:
Nueva Demanda = Demanda Normal + (Demanda Normal * (Porcentaje de Aumento / 100))  Impacto: Demuestra con rigor científico cómo el comportamiento de pánico genera un desabastecimiento inducido, quebrando stocks estables de almacenamiento. 

## 📈 Impacto Académico y Utilidad

La relevancia de este ecosistema radica en su valor como herramienta de simulación predictiva y pedagógica:  
Neutralidad Científica: Desplaza el debate de opiniones cualitativas hacia el análisis cuantitativo y factual de los números.  
Concientización Financiera: Ayuda a entender de forma inmediata cómo factores externos incontrolables alteran el poder adquisitivo familiar real.  
Visión Logística: Funciona como un modelo a escala micro para visualizar problemas de abastecimiento y distribución que afectan a comunidades enteras.  

## Conclusión General
El desarrollo de este simulador interactivo demuestra cómo las herramientas de programación web (HTML5, CSS3 y JavaScript) pueden trascender el plano comercial o de entretenimiento para convertirse en potentes instrumentos de análisis pedagógico, social y cuantitativo. Al modelar computacionalmente variables del contexto real —tales como la autonomía de carburantes, las brechas inflacionarias o las dinámicas de desabastecimiento inducidas por pánico— se logra aislar la subjetividad de las crisis y traducirlas al lenguaje universal de las matemáticas y la lógica algorítmica.

Desde la perspectiva del desarrollo técnico, la implementación de una interfaz bajo el concepto estético Liquid Glass (Glassmorphism) con una paleta corporativa de verdes demuestra que el software técnico no tiene por qué sacrificar la experiencia de usuario; la sobriedad visual y la adaptabilidad responsiva resultan claves para capturar el interés del operador. Asimismo, la correcta manipulación de la estructura del DOM y el blindaje mediante validación de datos en el lado del cliente (client-side) garantizan un software reactivo, robusto, coherente y libre de errores en consola.

En última instancia, el proyecto cumple con creces el objetivo de evidenciar que la tecnología es un puente indispensable para proyectar escenarios de incertidumbre, permitiendo a familias, analistas y comunidades predecir contingencias logísticas, optimizar recursos limitados y tomar decisiones informadas y racionales basadas puramente en datos factibles.

Links:

[Página web](https://pablointiquilla-cmd.github.io/Proyecto_Final/)

[Repositorio de git hub](https://github.com/pablointiquilla-cmd/Proyecto_Final.git)
