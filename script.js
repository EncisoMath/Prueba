document.addEventListener('DOMContentLoaded', cargarAniosYPruebas);

async function cargarAniosYPruebas() {
    try {
        const response = await fetch('general.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo general: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera si la hay

        // Estructuras para almacenar años y pruebas únicos
        const anios = new Set();
        const pruebasPorAnio = {};

        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length >= 3) { // Verificar que al menos tenga 3 columnas
                const [ANIO, PRUEBA] = columns.slice(0, 2).map(col => col.trim());
                anios.add(ANIO);
                
                if (!pruebasPorAnio[ANIO]) {
                    pruebasPorAnio[ANIO] = new Set();
                }
                pruebasPorAnio[ANIO].add(PRUEBA);
            }
        });

        // Llenar selector de años
        const anoSelect = document.getElementById('ano');
        anios.forEach(anio => {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            anoSelect.appendChild(option);
        });

        // Event listener para actualizar pruebas al cambiar de año
        anoSelect.addEventListener('change', () => {
            const selectedYear = anoSelect.value;
            const pruebaSelect = document.getElementById('prueba');
            pruebaSelect.innerHTML = '<option value="">Selecciona una prueba</option>'; // Limpiar opciones anteriores

            if (pruebasPorAnio[selectedYear]) {
                pruebasPorAnio[selectedYear].forEach(prueba => {
                    const option = document.createElement('option');
                    option.value = prueba;
                    option.textContent = prueba;
                    pruebaSelect.appendChild(option);
                });
            }

            document.getElementById('container-prueba').style.display = selectedYear ? 'block' : 'none';
        });

    } catch (error) {
        console.error('Error al cargar los años y pruebas:', error);
        alert('Hubo un error al cargar los datos. Por favor, revisa la consola para más detalles.');
    }
}

function mostrarCampoCodigo() {
    const pruebaSelect = document.getElementById('prueba');
    document.getElementById('busqueda').style.display = pruebaSelect.value ? 'block' : 'none';
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
        // Buscar el archivo correspondiente en 'general.csv'
        const generalResponse = await fetch('general.csv');
        if (!generalResponse.ok) {
            throw new Error(`Error al cargar el archivo general: ${generalResponse.statusText}`);
        }
        const generalData = await generalResponse.text();
        const generalRows = generalData.split('\n').slice(1); // Saltar la cabecera

        let archivo = null;
        for (const row of generalRows) {
            const columns = row.split(',').map(col => col.trim());
            if (columns[0] === anio && columns[1] === prueba) {
                archivo = columns[2]; // Asignar la columna ARCHIVO
                break;
            }
        }

        if (!archivo) {
            resultado.innerHTML = 'No se encontró el archivo correspondiente para la combinación de año y prueba seleccionada.';
            return;
        }

        // Realizar la búsqueda en el archivo correspondiente
        const response = await fetch(`${archivo}.csv`);
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo ${archivo}: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera si existe

        // Filtrar por el código ingresado
        const match = rows.find(row => row.startsWith(codigo));
        if (match) {
            resultado.innerHTML = `<div class="resultado-item">${match}</div>`;
        } else {
            resultado.innerHTML = 'No se encontraron resultados para el código ingresado.';
        }
    } catch (error) {
        console.error('Error durante la búsqueda:', error);
        resultado.innerHTML = 'Hubo un error al realizar la búsqueda.';
    }
}
