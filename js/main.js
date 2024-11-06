const app = Vue.createApp({
    data() {
        return {
            intro: 'World Of Dough',
            pizzas: 1,
            hydration: 60,
            pizzaSize: 250,
            fermentation: 'direct',
            favorites: [],
            filterPizzas: null,
            filterFermentation: ''
        };
    },
    computed: {
        doughWeightPerPizza() {
            return parseFloat(this.pizzaSize);
        },
        totalFlour() {
            return this.pizzas * (this.doughWeightPerPizza / (1 + this.hydration / 100 + 0.025 + 0.001));
        },
        ingredients() {
            const flour = this.totalFlour;
            const water = flour * (this.hydration / 100);
            const yeast = flour * 0.0033; // 0.33% gær
            const salt = flour * 0.026;   // 2.6% salt
            return {
                flour: flour.toFixed(0),
                water: water.toFixed(0),
                yeast: yeast.toFixed(1),
                salt: salt.toFixed(1)
            };
        },
        methodSteps() {
            const flour = parseFloat(this.ingredients.flour);
            const water = parseFloat(this.ingredients.water);
            const yeast = parseFloat(this.ingredients.yeast);
            const salt = parseFloat(this.ingredients.salt);

            if (this.fermentation === 'direct') {
                return [
                    'Bland alt melet med ca. 70% af vandet og rør, indtil alt melet er fugtet. Lad hvile i 30 minutter (autolyse).',
                    'Tilsæt gær, salt og det resterende vand, og ælt dejen glat og elastisk i 10-15 minutter.',
                    'Lad dejen fermentere i 2 timer ved stuetemperatur, dækket til.',
                    'Sæt dejen på køl i mindst 12-24 timer for langsom fermentering og smagsudvikling.',
                    'Tag dejen ud af køleskabet og lad den hvile ved stuetemperatur i 1 time.',
                    'Del dejen i boller, form dem forsigtigt, og lad dem hæve yderligere 2-3 timer ved stuetemperatur, indtil de er luftige og klar til brug.',
                    'Processen kan fremskyndes hvis dejen evt. skal benyttes samme dag.'
                ];
            } else if (this.fermentation === 'biga') {
                return [
                    `1. Kombinér al melet (${flour} g) med præcis 50% af melets vægt i vand (${(flour * 0.5).toFixed(0)} g) samt gæren (${yeast} g). Bland grundigt, indtil alt melet er absorberet.`,
                    '2. Lad bigaen fermentere i 1-2 timer ved stuetemperatur, og sæt den derefter på køl til næste dag.',
                    `3. Næste dag tilsættes det resterende vand (${(water - flour * 0.5).toFixed(0)} g) samt saltet (${salt} g), og dejen æltes grundigt.`,
                    '4. Form dejen til boller eller lad den fermentere yderligere i køleskabet.'
                ];
            } else if (this.fermentation === 'poolish') {
                return [
                    `Bland halvdelen af melet (${(flour / 2).toFixed(0)} g) med samme mængde vand (${(flour / 2).toFixed(0)} g) og al gæren (${yeast} g).`,
                    'Lad poolishen fermentere i 8-12 timer ved stuetemperatur.',
                    `Næste dag tilsættes resten af melet (${(flour / 2).toFixed(0)} g), det resterende vand (${(water - flour / 2).toFixed(0)} g) og saltet (${salt} g). Ælt grundigt.`,
                    'Form dejen til boller eller lad den hæve yderligere.'
                ];
            } else {
                return [];
            }
        },
        filteredFavorites() {
            return this.favorites.filter(favorite => {
                let matchesPizzas = true;
                let matchesFermentation = true;

                if (this.filterPizzas !== '' && this.filterPizzas !== null) {
                    matchesPizzas = favorite.pizzas == this.filterPizzas;
                }

                if (this.filterFermentation !== '') {
                    matchesFermentation = favorite.fermentation === this.filterFermentation;
                }

                return matchesPizzas && matchesFermentation;
            });
        }
    },
    methods: {
        addToFavorites() {
            const recipe = {
                fermentation: this.fermentation,
                pizzaSize: this.pizzaSize,
                pizzas: this.pizzas,
                hydration: this.hydration,
                ingredients: this.ingredients,
                methodSteps: this.methodSteps
            };
            this.favorites.push(recipe);
        },
        removeFromFavorites(index) {
            this.favorites.splice(index, 1);
        }
    }
});
