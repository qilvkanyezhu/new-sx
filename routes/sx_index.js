const express = require('express');
//�������ӳ�ģ��
const pool = require('../sx_pool.js');
//����·��������
let router = express.Router();
//����·��
router.get('/index',(req,res)=>{
    let obj={};
    pool.query(`
    SELECT cid,img,title,href FROM sx_index_advertisement;
    SELECT pid,title,details,pic,price,href FROM sx_index_product WHERE seq_recommended>0 ORDER BY seq_recommended  LIMIT 3;
    SELECT pid,title,details,pic,price,href FROM sx_index_product WHERE seq_new_arrival>0 ORDER BY seq_new_arrival LIMIT 3;
    SELECT pid,title,details,pic,price,href FROM sx_index_product WHERE seq_top_sale>0 ORDER BY seq_top_sale LIMIT 3;
    `,(err,result)=>{
        if(err) throw err;
        obj.carouselItems=result[0];
        obj.recommendedItems=result[1];
        obj.newArrialItems=result[2];
        obj.topSaleItems=result[3];
        res.send(obj);
    })
});
//����·��������
module.exports=router;