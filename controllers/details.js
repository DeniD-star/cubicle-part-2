module.exports = {
    details : (req, res)=>{
        console.log(req.params.id);
        res.render('details', {title: 'Cubicle details'});
    }
}