module.exports = {
    catalog: async (req, res) => {
        const cubes = await req.storage.getAll()//vru6ta masiv s vsi4ki kub4eta
        res.render('index', { title: 'Cubicle' });

        console.log(cubes);
        
        const ctx = {
            title: 'Cubicle',
            cubes
        }

        res.render('index', ctx)
    }
}