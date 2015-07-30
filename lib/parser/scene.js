var scene = {
    content: "",
    title: "",
    create: function (title) {
        this.title = title;
        this.content = ""+
          "package classes.Scenes.Areas.Swamp {\
          	import classes.*;\
          	import classes.GlobalFlags.kFLAGS;\
          	import classes.GlobalFlags.kGAMECLASS;
          	import classes.Scenes.Places.TelAdre;
\
          	public class " + title + " extends BaseContent{\
\
            	public function Rogar()\
            	{\
            	}\
\
              }\
          }"
    }
};
