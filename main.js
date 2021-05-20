var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var template = require('./template.js');
/*
var template ={
  html: function(title,list,body, control){
    return `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              ${control}
              ${body}
            </body>
            </html>
            `;
  
  },
  list:function(filelist){
    var list = '<ul>';
    var i = 0;
    
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i +1;
    }
    list = list + '</ul>';
  
    return list;
  
  }
}
*/


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathName = url.parse(_url,true).pathname;
    var title = queryData.id;

    if(pathName === "/"){
      if(queryData.id === undefined)
      {
        fs.readdir('./data',function(error, filelist){
            
          var title="welcome";
          var description = "hello, Node JS";
          /*
          var list = templateList(filelist);
          var template = templateHTML(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
         
          response.writeHead(200);
          // when users select the page, map the url
          response.end(template);
          */
          var list = template.list(filelist);
          var html = template.html(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
        
          response.writeHead(200);
          // when users select the page, map the url
          response.end(html);
        });

      }else{
        fs.readdir('./data',function(error, filelist){
          var list = template.list(filelist);

          fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          var title =queryData.id;
          var html = template.html(title,list,`<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>
          <a href="/update?id=${title}">update</a>
          <form action="delete_process" method="post"> <input type="hidden" name="id" value="${title}"><input type="submit" value="delete"></form>`);
          //200 means Success
          response.writeHead(200);
          // when users select the page, map the url
          response.end(html);
           });
          });
      }
      
    }else if(pathName === '/create'){
      fs.readdir('./data',function(error, filelist){
            
        var title="WEB - create";
        
        var list = template.list(filelist);
        var html = template.html(title,list,`
        <form action ="/create_process" method = "post">
        <p><input type = "text" name = "title" placeholder = "title"></p>
        <p><textarea name = "description" placeholder = "description" ></textarea></p>
        <p><input type="submit"></p>
        </form>

        `,'');
       
        response.writeHead(200);
        // when users select the page, map the url
        response.end(html);
      });

    }else if(pathName === '/create_process'){
      var body = '';
      request.on('data',function(data){
        body = body+data;

      });
      request.on('end',function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`,description,'utf8',function(err){
          // 302 - redirecting
          response.writeHead(302,{Location: `/?id=${title}`});
          response.end();
        });
      });

    }else if(pathName === '/update'){
      fs.readdir('./data',function(error, filelist){
        var list = template.list(filelist);

        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
        var title =queryData.id;
        var html = template.html(title,list,
          `
          <form action ="/update_process" method = "post">
          <input type="hidden" name="id" value="${title}">
          <p><input type = "text" name = "title" placeholder = "title" value = "${title}"></p>
          <p><textarea name = "description" placeholder = "description" >${description}</textarea></p>
          <p><input type="submit"></p>
          </form>
          
          
          `,`<a href="/create">create</a><a href="/update?id=${title}">update</a>`);
        //200 means Success
        response.writeHead(200);
        // when users select the page, map the url
        response.end(html);
         });
        });
    }else if(pathName === '/update_process'){
    
      var body = '';
      request.on('data',function(data){
        body = body+data;

      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`,`data/${title}`,function(error){
          fs.writeFile(`data/${title}`,description,'utf8',function(err){
            // 302 - redirecting
            response.writeHead(302,{Location: `/?id=${title}`});
            response.end();
          });
        });
      });

    
    }else if(pathName === '/delete_process'){
      
      var body = '';
      request.on('data',function(data){
        body = body+data;

      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`,function(error){
          response.writeHead(302,{Location:'/'});
          response.end();
        });

      });
    }else{
      response.writeHead(404);
      response.end('Not found');
    }

    });

app.listen(3000);