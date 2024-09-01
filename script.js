async function cargarAnios() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/usuario/repositorio/rama/datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        // Extraer años únicos
        const anios = new Set();
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 4) {
                const [ANIO] = columns.map(col => col.trim()); // Extraer el valor de ANIO
                anios.add(ANIO);
            }
        });

        const anoSelect = document.getElementById('ano');
        anios.forEach(anio => {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            anoSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar los años:', error);
    }
}

async function cargarPruebas() {
    const anio = document.getElementById('ano').value;
    if (!anio) return;

    try {
        const response = await fetch('https://raw.githubusercontent.com/usuario/repositorio/rama/datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        // Extraer pruebas para el año seleccionado
        const pruebas = new Set();
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 4) {
                const [ANIO, PRUEBA] = columns.map(col => col.trim()); // Extraer valores de ANIO y PRUEBA
                if (ANIO === anio) {
                    pruebas.add(PRUEBA);
                }
            }
        });

        const pruebaSelect = document.getElementById('prueba');
        pruebaSelect.innerHTML = '<option value="">Selecciona una prueba</option>'; // Limpiar opciones anteriores
        pruebas.forEach(prueba => {
            const option = document.createElement('option');
            option.value = prueba;
            option.textContent = prueba;
            pruebaSelect.appendChild(option);
        });

        document.getElementById('container-prueba').style.display = 'block'; // Mostrar el campo de prueba

    } catch (error) {
        console.error('Error al cargar las pruebas:', error);
    }
}

function mostrarCampoCodigo() {
    const prueba = document.getElementById('prueba').value;
    if (prueba) {
        document.getElementById('busqueda').style.display = 'block'; // Mostrar el campo de código
    }
}

async function buscar() {
    const codigo = document.getElementById('codigo').value.trim();
    const resultado = document.getElementById('resultado');
    const anio = document.getElementById('ano').value;
    const prueba = document.getElementById('prueba').value;

    if (codigo.length !== 4) {
        resultado.innerHTML = 'Por favor, ingresa un código de 4 dígitos.';
        return;
    }

    try {
        const response = await fetch('https://raw.githubusercontent.com/usuario/repositorio/rama/datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        let encontrado = false;

        for (const row of rows) {
            const columns = row.split(',');
            if (columns.length >= 8) { // Asegurarse de que hay suficientes columnas
                const [ANIO, PRUEBA, ID, NOTAFINAL, PROMEDIO, NOMBRE, SEDE, GRADO] = columns.map(col => col.trim()); // Eliminar espacios en blanco

                if (ANIO === anio && PRUEBA === prueba && ID === codigo) {
                    resultado.innerHTML = `
                        <h1>Resultados</h1>
                        <div class="resultado-item">
                            <span style="color: orange;">Alumno: </span>
                            <span>${NOMBRE}</span>
                        </div>
                        <div class="resultado-item">
                            <span style="color: orange;">Sede: </span>
                            <span>${SEDE}</span>
                        </div>
                        <div class="resultado-item">
                            <span style="color: orange;">Grado: </span>
                            <span>${GRADO}</span>
                        </div>
                        <hr style="border: 3px solid red; margin: 20px 0;">
                        <div>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px;">Asignatura</th>
                                    <th style="border: 1px solid #ddd; padding: 8px;">Nota</th>
                                </tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">ARITMETICA</td><td style="border: 1px solid #ddd; padding: 8px;">${ARITMETICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">ESTADISTICA</td><td style="border: 1px solid #ddd; padding: 8px;">${ESTADISTICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">GEOMETRIA</td><td style="border: 1px solid #ddd; padding: 8px;">${GEOMETRIA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">EDU. FISICA</td><td style="border: 1px solid #ddd; padding: 8px;">${EDU_FISICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">INGLES</td><td style="border: 1px solid #ddd; padding: 8px;">${INGLES}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">ETICA</td><td style="border: 1px solid #ddd; padding: 8px;">${ETICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">BIOLOGIA</td><td style="border: 1px solid #ddd; padding: 8px;">${BIOLOGIA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">FISICA</td><td style="border: 1px solid #ddd; padding: 8px;">${FISICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">QUIMICA</td><td style="border: 1px solid #ddd; padding: 8px;">${QUIMICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">INFORMATICA</td><td style="border: 1px solid #ddd; padding: 8px;">${INFORMATICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">HISTORIA</td><td style="border: 1px solid #ddd; padding: 8px;">${HISTORIA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">GEOGRAFIA</td><td style="border: 1px solid #ddd; padding: 8px;">${GEOGRAFIA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">CONSTITUCION</td><td style="border: 1px solid #ddd; padding: 8px;">${CONSTITUCION}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">FILOSOFIA</td><td style="border: 1px solid #ddd; padding: 8px;">${FILOSOFIA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">RELIGION</td><td style="border: 1px solid #ddd; padding: 8px;">${RELIGION}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">LENGUACASTELLANA</td><td style="border: 1px solid #ddd; padding: 8px;">${LENGUACASTELLANA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">LECTURACRITICA</td><td style="border: 1px solid #ddd; padding: 8px;">${LECTURACRITICA}</td></tr>
                                <tr><td style="border: 1px solid #ddd; padding: 8px;">ARTISTICA</td><td style="border: 1px solid #ddd; padding: 8px;">${ARTISTICA}</td></tr>
                            </table>
                        </div>
                    `;
                    encontrado = true;
                    break;
                }
            }
        }

        if (!encontrado) {
            resultado.innerHTML = 'Código no encontrado para los parámetros seleccionados.';
        }

    } catch (error) {
        console.error('Error al buscar datos:', error);
    }
}
