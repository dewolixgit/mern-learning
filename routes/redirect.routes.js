const { Router } = require('express');
const Link = require('../models/Link');

const router = Router();

router.get('/:code', async (req, res) => {
    try {
        console.log(req.params.code);
        const link = await Link.findOne({ code: req.params.code });
        console.log(link)

        if (link) {
            link.clicks++;
            await link.save();

            return res.redirect(link.from);
        }

        return res.status(404).json('Ссылка не найдена');
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
})

module.exports = router;