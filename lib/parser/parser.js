var Class = function(methods) {
    var klass = function() {
        this.initialize.apply(this, arguments);
    };

    for (var property in methods) {
       klass.prototype[property] = methods[property];
    }

    if (!klass.prototype.initialize) klass.prototype.initialize = function(){};

    return klass;
};


var textBlock = Class( {
    initialize: function(text) {
        this.text = text;
    },
    toString: function() {
        return this.text;
    }
});
var conditionBlock = Class( {
    initialize: function(condition, contents) {
        this.condition = condition;
        this.contents  = contents;
    },
    toString: function() {
        return this.condition;
    }
});

var parser = {
  result: [],
  title: "",
  run: function(fileName) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        text = xmlhttp.responseText;
        lines = text.split("\n");
        for (i = 0; i < lines.length; i++) {
          if(!parser.setConditions(lines[i])) {
            parser.result.push(new textBlock(lines[i]));
          }

        }
      }
    };
    xmlhttp.open("GET", fileName, true);
    xmlhttp.send();

    parser.show();
  },
  setConditions: function(text) {
      if( (text.indexOf("if ") >= 0) &&
          (text.indexOf("//") == -1) &&
          (text.indexOf("outputText") == -1)) {
            parser.result.push(new conditionBlock(text,""));
            return true;
      }
      return false;
  },
  show: function() {
    parser.result.forEach(function(text, index) {

    $("#contentList").append('<li class="if" draggable="true">'+  text.toString() +'</li>');
    });
  }

};
