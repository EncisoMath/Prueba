async function buscar() {
    const codigo = document.getElementById('codigo').value.trim();
    const resultado = document.getElementById('resultado');

    if (codigo.length !== 4) {
        resultado.textContent = 'Por favor, ingresa un código de 4 dígitos.';
        return;
    }

    try {
        const response = await fetch('DATOS.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        let encontrado = false;

        for (const row of rows) {
            const [llave, notaFinal, promedio] = row.split(',');

            if (llave === codigo) {
                resultado.textContent = `NOTA FINAL: ${notaFinal}, PROMEDIO: ${promedio}`;
                encontrado = true;
                break;
            }
        }

        if (!encontrado) {
            resultado.textContent = 'Código no encontrado.';
        }
    } catch (error) {
        console.error('Error al leer el archivo CSV:', error);
        resultado.textContent = 'Hubo un error al procesar la solicitud.';
    }
}
