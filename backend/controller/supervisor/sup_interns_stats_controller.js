const { connection } = require("../../config/connection");

const GetActiveInternSup = (req, res) => {
    const manager_id = req.params.manager_id; // Assuming manager_id is passed as a parameter
    
    const sql = `
        SELECT COUNT(*) as active_interns_count
        FROM intern_accounts ia
        JOIN technologies t ON ia.int_technology = t.technology
        JOIN supervisor_permissions sp ON t.tech_id = sp.tech_id
        WHERE sp.manager_id = ? AND ia.int_status = 'Active'
    `;
    
    connection.query(sql, [manager_id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.json(data[0]); // Return the count directly
        }
    });
};

const GetTestInternSup = (req, res) => {
    const manager_id = req.params.manager_id; // Assuming manager_id is passed as a parameter
    
    const sql = `
        SELECT COUNT(*) as test_interns_count
        FROM intern_accounts ia
        JOIN technologies t ON ia.int_technology = t.technology
        JOIN supervisor_permissions sp ON t.tech_id = sp.tech_id
        WHERE sp.manager_id = ? AND ia.int_status = 'Test'
    `;
    
    connection.query(sql, [manager_id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.json(data[0]); // Return the count directly
        }
    });
};

const GetCompletedInternSup = (req, res) => {
    const manager_id = req.params.manager_id; // Assuming manager_id is passed as a parameter
    
    const sql = `
        SELECT COUNT(*) as completed_interns_count
        FROM intern_table it
        JOIN technologies t ON it.technology = t.technology
        JOIN supervisor_permissions sp ON t.tech_id = sp.tech_id
        WHERE sp.manager_id = ? AND it.status = 'Completed'
    `;
    
    connection.query(sql, [manager_id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.json(data[0]); // Return the count directly
        }
    });
};

const GetProgressInternSup = (req, res) => {
    const manager_id = req.params.manager_id; // Assuming manager_id is passed as a parameter
    
    const sql = `
        SELECT COUNT(*) as progress_interns_count
        FROM intern_accounts ia
        JOIN technologies t ON ia.int_technology = t.technology
        JOIN supervisor_permissions sp ON t.tech_id = sp.tech_id
        WHERE sp.manager_id = ? AND ia.int_status = 'Active'
    `;
    
    connection.query(sql, [manager_id], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            return res.json(data[0]); // Return the count directly
        }
    });
};


// Get Onsite Interns Data
const GetOnsiteInterns = (req, res) => {
    const manager_id = req.params.manager_id;
    
    const sql = `
        SELECT 
            COUNT(*) as onsite_count,
            MONTH(it.created_at) as month
        FROM intern_table it
        JOIN technologies t ON it.technology = t.technology
        JOIN supervisor_permissions sp ON t.tech_id = sp.tech_id
        WHERE sp.manager_id = ? 
          AND it.status = 'Active'
          AND it.intern_type = 'Onsite'
          AND YEAR(it.created_at) = YEAR(CURDATE())
        GROUP BY MONTH(it.created_at)
        ORDER BY month
    `;
    
    connection.query(sql, [manager_id], (err, data) => {
        if (err) {
            return res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
        
        // Format data for chart
        const result = {
            labels: [],
            data: []
        };
        
        // Fill all months (1-12)
        for (let i = 1; i <= 12; i++) {
            const monthData = data.find(item => item.month === i);
            result.labels.push(getMonthName(i));
            result.data.push(monthData ? monthData.onsite_count : 0);
        }
        
        return res.json({
            success: true,
            data: result
        });
    });
};

const GetRemoteInterns = (req, res) => {
    const manager_id = req.params.manager_id;
    
    const sql = `
        SELECT 
            COUNT(*) as remote_count,
            MONTH(it.created_at) as month
        FROM intern_table it
        JOIN technologies t ON it.technology = t.technology
        JOIN supervisor_permissions sp ON t.tech_id = sp.tech_id
        WHERE sp.manager_id = ? 
          AND it.status = 'Active'
          AND it.intern_type = 'Remote'
          AND YEAR(it.created_at) = YEAR(CURDATE())
        GROUP BY MONTH(it.created_at)
        ORDER BY month
    `;
    
    connection.query(sql, [manager_id], (err, data) => {
        if (err) {
            return res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
        
        // Format data for chart
        const result = {
            labels: [],
            data: []
        };
        
        // Fill all months (1-12)
        for (let i = 1; i <= 12; i++) {
            const monthData = data.find(item => item.month === i);
            result.labels.push(getMonthName(i));
            result.data.push(monthData ? monthData.remote_count : 0);
        }
        
        return res.json({
            success: true,
            data: result
        });
    });
};

// Helper function to get month name
function getMonthName(monthNumber) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return months[monthNumber - 1];
}

module.exports = {
    GetActiveInternSup,
    GetTestInternSup,
    GetCompletedInternSup,
    GetProgressInternSup,
    GetOnsiteInterns,
    GetRemoteInterns
};