/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: (req, res) => {
        Articles.find().exec((err, articles) => {
            if(err){
                res.send(500, {err: err});
            }

            res.view('articles/articles', {articles: articles});
     });
        
},

    add: (req,res) => {
    const title = req.body.title;
    const body = req.body.body;
    Articles.create({ title: title, body: body}).exec(function(err){
        if(err){
            res.send(500, {err: err});
        }
        res.redirect('/articles/list');
    });

},


    edit: (req,res) => {
        Articles.find({ id: req.params.id}).exec(function(err, articles){
            if(err){
                res.send(500, {err: err});
            }

            res.view('articles/edit', {articles : articles[0]})

        });

    },

    delete: (req,res) =>{
        Articles.destroy({id: req.params.id}).exec(function(err){
            if(err){
                res.send(500, {err: err});
            }
            res.redirect('/articles/list');
        });

    },

    update: (req,res) =>{
        const title = req.body.title;
        const body = req.body.body;

        Articles.update({ id: req.params.id },{ title: title, body: body}).exec(function(err){
            if(err){
                res.send(500, {err: err});
            }
            res.redirect('/articles/list');
        });

    }
  

};

