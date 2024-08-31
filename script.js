async function buscar() {
    const codigo = document.getElementById('codigo').value.trim();
    const resultado = document.getElementById('resultado');

    if (codigo.length !== 4) {
        resultado.textContent = 'Por favor, ingresa un código de 4 dígitos.';
        return;
    }

    try {
        const response = await fetch('datos.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        let encontrado = false;

        // Depuración: Verificar qué se está leyendo del CSV
        console.log('Contenido del CSV:', rows);

        for (const row of rows) {
            const columns = row.split(',');
            if (columns.length >= 3) {  // Asegurarse de que hay suficientes columnas
                const [LLAVE, NOTAFINAL, PROMEDIO] = columns.map(col => col.trim()); // Eliminar espacios en blanco

                // Depuración: Mostrar cada valor de LLAVE comparado
                console.log(`Comparando: "${LLAVE}" con "${codigo}"`);

                if (LLAVE === codigo) {
                    resultado.textContent = `NOTA FINAL: ${NOTAFINAL}, PROMEDIO: ${PROMEDIO}`;
                    encontrado = true;
                    break;
                }
            }
        }

        if (!encontrado) {
            resultado.textContent = 'Código no encontrado.';
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        resultado.textContent = 'Hubo un error al procesar la solicitud.';
    }
}
