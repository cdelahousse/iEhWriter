//Constructor
function IEhWtr (selector,spellcheck) {
	var $ = window.jQuery, //Local private jQuery
			//spellcheck default to true. if other than boolean false, value is true
			spellcheck = (spellcheck === undefined) ? true : !(spellcheck === false),
			content_area = $(selector); 


	this.init = function () {
		content_area
			.attr('contentEditable','true')
			.attr('spellcheck',spellcheck)
			//Insert initial <p>. Or else, browsers create new <div> tags at line bres.
			.html('<p>Type anything!</p>'); 
			//.text('Type anything!');
	}
	
	
	this.test = this.t = {
		getjq: content_area,
		getElem: content_area[0],
		//Content editable toggle
		editable: function (){
			return this.getElem.contentEditable = !this.getElem.isContentEditable ;
		},
		genContent : function (n) {
			content_area.empty();
			content_area.append(this.loremPara(n));
		},

		//Create paragraphs of lorem
		loremPara : function (n) { //n = number of paragraphs
			var para_length,
					paras = $([]), //Empty jQuery object
					single_para;

			while (n > 0) {
				para_length = 20 + Math.floor(Math.random()*30); //Paragraph word length

				single_para = $(document.createElement('p')).text(this.lorem(para_length));

				paras = paras.add(single_para); // Add to the set and return the resulting set

				n--
			}
			console.log(paras);
			return paras;
		},

		//Builds Lorem Ipsum. Invoke with word count argument. 
		//Wihtout argument, a sentence is returned
		// Much code borrowed from http://bridell.com/loremipsum
		lorem: function (word_count) {

			var library = ["ab", "aberant", "abscidit", "acervo", "ad", "addidit", "adhuc", "adsiduis", "adspirate","animalia", "animalibus", "animus", "ante", "aquae", "arce", "ardentior", "astra", "aurea", "auroram", "austro", "bene", "boreas", "bracchia", "caeca", "caecoque", "caeleste", "caeli", "caelo", "caelum", "caelumque", "caesa", "calidis", "caligine", "campoque", "campos", "capacius", "carentem", "carmen", "cepit", "certis", "cesserunt", "cetera", "chaos:", "cingebant", "cinxit", "circumdare", "circumfluus", "circumfuso", "coegit", "coeperunt", "coeptis", "coercuit", "cognati",  "declivia", "dedit", "deducite", "deerat", "dei", "densior", "deorum", "derecti", "descenderat", "deus", "dextra", "di", "dicere", "diffundi", "diremit", "discordia", "dispositam", "dissaepserat", "dissociata", "distinxit", "diu", "diversa", "diverso", "divino", "dixere", "dominari", "duae", "duas", "duris", "effervescere", "effigiem", "egens", "elementaque", "emicuit", "ensis", "eodem", "erant", "erat", "erat:", "erectos", "est", "et", "eurus", "evolvit", "exemit", "extendi", "fabricator", "formas", "fossae", "fratrum", "freta", "frigida", "frigore", "fronde", "fuerant", "fuerat", "fuit", "fulgura", "fulminibus", "galeae", "gentes", "glomeravit", "grandia", "gravitate", "habendum", "habentem", "habentia", "habitabilis", "habitandae", "haec", "hanc", "his", "homini", "hominum", "homo", "horrifer", "humanas", "hunc", "iapeto", "ignea", "igni", "ignotas", "illas", "ille", "illi", "illic", "iudicis", "iuga", "iunctarum", "iussit", "lacusque", "lanient", "lapidosos", "lege", "legebantur", "lucis", "lumina", "madescit", "magni", "manebat", "mare", "margine", "matutinis","mutastis", "mutatas", "nabataeaque", "nam", "natura", "naturae", "natus", "ne", "nuper", "obliquis", "obsistitur", "obstabatque", "occiduo", "omni", "omnia", "onerosior", "origo", "os", "otia", "pace", "parte", "partim", "passim", "pendebat", "peragebant","praebebat", "praecipites", "praeter", "premuntur", "pressa", "prima", "primaque", "principio", "pro", "pronaque", "proxima", "proximus", "pugnabant", "pulsant", "quinta", "quisque", "quisquis", "quod", "quoque", "radiis", "rapidisque", "recens", "recepta", "recessit", "rectumque", "regat", "regio", "rerum", "retinebat", "ripis", "rudis", "sanctius", "sata", "satus", "scythiam", "secant", "sponte", "stagna", "sua", "subdita", "sublime", "subsidere", "sui", "suis", "summaque", "sunt", "super", "supplex", "surgere", "tanta", "tanto", "tegi", "tegit", "tollere", "tonitrua", "totidem", "totidemque", "toto", "tractu", "traxit", "triones", "tuba", "tum", "undae", "undas", "undis", "uno", "unus", "usu", "ut", "utque", "utramque", "valles", "ventis", "ventos", "verba", "vesper", "videre", "vindice", "vis", "viseret", "vix", "volucres", "vos", "vultus", "zephyro", "zonae"],

					punctuation = ['.', '.', '.','.','.','.','?','?','!','!',';',','], //Add more of one to increase probability
					str = '',
					i = word_count,// counter to count down from
					sen_len = 0 ; //Init at zero
			
			do { 
				//Sentence lengths 5 to 15 words
				sen_len = 5 + Math.floor(Math.random()*10);

				//Make last sentence match max word count
				sen_len = (i - sen_len) <= 0 ? i : sen_len;
				
				str += buildSentence(sen_len);
				
				i -= sen_len;
			} while (i > 0);
			
			return str;

			//Builds a capitalised and punctuated sentence
			function buildSentence (num) {
				var s = buildWordList(num).join(' ');
				return s.charAt(0).toUpperCase() + 
					s.substring(1) + getPunctuation() + ' ';
			}

			//Builds an array of words
			function buildWordList (num) { //Uses recursion. 
				return num === 0 ? [] :
					buildWordList(--num).concat(getLibraryWord());
			}

			function getPunctuation(){
				return punctuation[Math.floor(Math.random()*punctuation.length)]
			}

			//Do library lookup using a random number as an array index
			function getLibraryWord() {
				return library[Math.floor(Math.random()*library.length)];
			}
		}
	}

	return this;
}

//iEhWriter Run Script
//Embed on page
var iEhWriter, //Global var
		t,elem; //Test vars xxx DEV STUFF
$(document).ready(function() {
	iEhWriter = new IEhWtr('#main-text');
	iEhWriter.init();
	//OR SIMPLY (new IEhWtr('#main-text')).init();


	t = iEhWriter.t; //xxx Dev stuff!
	elem = t.getElem;
})
