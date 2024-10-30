const app = Vue.createApp({
    data(){
        return{
            intro:'World Of Dough',
            pizzas: 1,
            hydration: 60,
            pizzaSize: 250,
            fermentation: 'direct',
            result: null,
            fermentationText:'',
            methodSteps:[]
            
        };
    }, 
    methods: {
        calculateDough(){
            //vægt pr pizzabolle
            const doughWeightPerPizza = this.pizzaSize;

            //Beregn samlet melmængde for ønsket antal pizzaer
            const totalFlour = this.pizzas * (doughWeightPerPizza/ (1+this.hydration/100 + 0.025 + 0.001));

            //Beregn ingredienser
            const water = totalFlour * (this.hydration/100);
            const yeast = totalFlour * 0.0033;//1,5% frisk gær
            const salt = totalFlour * 0.026; //2,6% salt
            
            this.result={
                flour: totalFlour.toFixed(0), //0 decimaler
                water: water.toFixed(0),
                yeast: yeast.toFixed(1),
                salt: salt.toFixed(1)
            };

            this.setMethodInstructions();

        },
        setMethodInstructions(){
            if(this.fermentation === 'direct'){
                this.fermentationText ='Direkte';
                this.methodSteps = [
                    'Bland alt melet med ca. 70% af vandet og rør, indtil alt melet er fugtet. Lad hvile i 30 minutter (autolyse).',
            'Tilsæt gær, salt og det resterende vand, og ælt dejen glat og elastisk i 10-15 minutter.',
            'Lad dejen fermentere i 2 timer ved stuetemperatur, dækket til.',
            'Sæt dejen på køl i mindst 12-24 timer for langsom fermentering og smagsudvikling.',
            'Tag dejen ud af køleskabet og lad den hvile ved stuetemperatur i 1 time.',
            'Del dejen i boller, form dem forsigtigt, og lad dem hæve yderligere 2-3 timer ved stuetemperatur, indtil de er luftige og klar til brug.',
            'Processen kan fremskyndes hvis dejen evt skal benyttes samme dag.'
                ];                           
            } else if (this.fermentation === 'biga'){
                this.fermentationText = 'Biga';
                this.methodSteps=[
                    `Kombinér al melet (${this.result.flour} g) med præcis 50% af melets vægt i vand (${this.result.flour * 0.5} g) samt gæren (${this.result.yeast} g). Bland grundigt med hænderne eller en gaffel, indtil alt melet er absorberet og dejen har en let smuldrende konsistens.`,
'Lad bigaen fermentere i 1-2 timer ved stuetemperatur, og sæt den derefter på køl til næste dag.',
`Næste dag tilsættes det resterende vand (${this.result.water - this.result.flour * 0.5} g) samt saltet (${this.result.salt} g), og dejen æltes grundigt, indtil den er glat og elastisk.`,
'Form dejen til individuelle boller eller lad den fermentere yderligere i køleskabet, afhængigt af den ønskede smagsudvikling og tekstur.'

                ];
            } else if (this.fermentation === 'poolish') {
                this.fermentationText = 'Poolish';
                this.methodSteps = [
                    `Bland halvdelen af melet (${this.result.flour / 2} gr) med samme mængde vand (${this.result.flour / 2} gr) og al gæren (${this.result.yeast} gr). Rør, indtil dejen er jævn og glat.`,
    'Lad poolishen fermentere i 8-12 timer ved stuetemperatur.',
    `Næste dag tilsættes resten af melet (${this.result.flour / 2} gr), det resterende vand (${this.result.water - this.result.flour / 2} gr) og saltet (${this.result.salt} gr). Ælt grundigt, indtil dejen er glat og elastisk.`,
    'Form dejen til boller eller lad den hæve yderligere, hvis nødvendigt.'
                ];
            }
        }
    },
    computed:{
        myComputed(){
            return''
        },
    }

});