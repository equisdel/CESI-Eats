// component-service/src/routes/componentRoutes.js
const express = require('express');
const router = express.Router(); // Crea un "mini-app" de Express para las rutas
const Component = require('../models/Component'); // Importa el modelo de Componente

// Middleware to check user role (JWT)
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};

// Listar todos los componentes disponibles
// GET /api/v1/components
router.get('/', checkRole(['third_party_developer', 'restaurant_owner', 'admin']), async (req, res) => {
    try {
        const components = await Component.find({}); // Encuentra todos los componentes
        res.status(200).json({
            message: 'Components retrieved successfully',
            count: components.length,
            data: components
        });
    } catch (error) {
        console.error('Error listing components:', error);
        res.status(500).json({ message: 'Failed to retrieve components', error: error.message });
    }
});

// Añadir un nuevo componente 
// POST /api/v1/components
router.post('/', checkRole(['admin']), async (req, res) => {
    try {
        const { component_id, name, version } = req.body;

        if (!component_id || !name || !version) {
            return res.status(400).json({ message: 'Missing required fields: component_id, name, version' });
        }

        // Verificar si el componente ya existe por ID o nombre/versión
        const existingComponent = await Component.findOne({ component_id: component_id });
        if (existingComponent) {
            return res.status(409).json({ message: 'Component with this ID already exists.' });
        }

        const newComponent = new Component({
            component_id,
            name,
            version,
            // download_count se inicializa en 0 por defecto
            // updated_at se inicializa con la fecha actual
        });

        await newComponent.save(); // Guarda el nuevo componente en la base de datos

        res.status(201).json({
            message: 'Component added successfully',
            data: newComponent
        });
    } catch (error) {
        console.error('Error adding component:', error);
        res.status(500).json({ message: 'Failed to add component', error: error.message });
    }
});

// Descargar un componente
// Por ahora, solo incrementamos el contador de descargas y simulamos la descarga
// GET /api/v1/components/:componentId/download
router.get('/:componentId/download', checkRole(['third_party_developer', 'restaurant_owner']), async (req, res) => {
    try {
        const { componentId } = req.params; // Obtiene el ID del componente de la URL

        const component = await Component.findOne({ component_id: componentId });

        if (!component) {
            return res.status(404).json({ message: 'Component not found.' });
        }

        // Incrementa el contador de descargas
        component.download_count += 1;
        component.updated_at = Date.now(); // Actualiza la fecha de última actualización
        await component.save();

        // Simula la descarga
        const simulatedDownloadUrl = `https://npm.example.com/${component.name}/v/${component.version}.tgz`;

        res.status(200).json({
            message: `Component '${component.name}' (v${component.version}) ready for download. Download count updated.`,
            downloadUrl: simulatedDownloadUrl,
            data: component // Devuelve el componente actualizado
        });

    } catch (error) {
        console.error(`Error downloading component ${req.params.componentId}:`, error);
        res.status(500).json({ message: 'Failed to download component', error: error.message });
    }
});

// RUTA 4: Eliminar un componente (Delete reusable components - para Technical Assistance)
// DELETE /api/v1/components/:componentId
router.delete('/:componentId', checkRole(['admin']), async (req, res) => {
    try {
        const { componentId } = req.params;

        const result = await Component.deleteOne({ component_id: componentId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Component not found.' });
        }

        res.status(200).json({ message: 'Component deleted successfully.' });
    } catch (error) {
        console.error(`Error deleting component ${req.params.componentId}:`, error);
        res.status(500).json({ message: 'Failed to delete component', error: error.message });
    }
});

module.exports = router;