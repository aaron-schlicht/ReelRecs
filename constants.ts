export interface Movie {
	id: number;
	title: string;
	overview?: string;
	poster_path: string;
	popularity: number;
	vote_average: number;
	release_date: string;
	serviceIds?: number[];
}

export interface FullMovie {
	id: number;
	title: string;
	overview?: string;
	poster_path: string;
	popularity: number;
	vote_average: number;
	release_date: string;
	runtime?: number;
	tagline?: string;
	services?: Service[];
}

export interface Service {
	logo_path: string;
	provider_id: number;
	provider_name: string;
}

export interface WatchProvider {
	provider_id: number;
	name: string;
	logo_url: string;
}

export const Providers: WatchProvider[] = [
	{ provider_id: 8, name: 'Netflix', logo_url: require('./assets/netflix.png') },
	{ provider_id: 9, name: 'Prime Video', logo_url: require('./assets/prime_video.png') },
	{ provider_id: 337, name: 'Disney Plus', logo_url: require('./assets/disney_plus.jpeg') },
	{ provider_id: 384, name: 'HBO Max', logo_url: require('./assets/max.png') },
	{ provider_id: 15, name: 'Hulu', logo_url: require('./assets/hulu.jpeg') },
	{ provider_id: 387, name: 'Peacock', logo_url: require('./assets/peacock.png') }
];

export const imageBasePath = 'https://image.tmdb.org/t/p/original/';

export interface Quote {
	quote: string;
	title: string;
	year: number;
}

export const Quotes: Quote[] = [
	{
		quote: "Frankly, my dear, I don't give a damn.",
		title: 'GONE WITH THE WIND',
		year: 1939
	},
	{
		quote: "I'm gonna make him an offer he can't refuse.",
		title: 'THE GODFATHER',
		year: 1972
	},
	{
		quote:
			"You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.",
		title: 'ON THE WATERFRONT',
		year: 1954
	},
	{
		quote: "Toto, I've a feeling we're not in Kansas anymore.",
		title: 'THE WIZARD OF OZ',
		year: 1939
	},
	{
		quote: "Here's looking at you, kid.",
		title: 'CASABLANCA',
		year: 1942
	},
	{
		quote: 'Go ahead, make my day.',
		title: 'SUDDEN IMPACT',
		year: 1983
	},
	{
		quote: "All right, Mr. DeMille, I'm ready for my close-up.",
		title: 'SUNSET BLVD.',
		year: 1950
	},
	{
		quote: 'May the Force be with you.',
		title: 'STAR WARS',
		year: 1977
	},
	{
		quote: "Fasten your seatbelts. It's going to be a bumpy night.",
		title: 'ALL ABOUT EVE',
		year: 1950
	},
	{
		quote: 'You talking to me?',
		title: 'TAXI DRIVER',
		year: 1976
	},
	{
		quote: "What we've got here is failure to communicate.",
		title: 'COOL HAND LUKE',
		year: 1967
	},
	{
		quote: 'I love the smell of napalm in the morning.',
		title: 'APOCALYPSE NOW',
		year: 1979
	},
	{
		quote: "Love means never having to say you're sorry.",
		title: 'LOVE STORY',
		year: 1970
	},
	{
		quote: 'The stuff that dreams are made of.',
		title: 'THE MALTESE FALCON',
		year: 1941
	},
	{
		quote: 'E.T. phone home.',
		title: 'E.T. THE EXTRA-TERRESTRIAL',
		year: 1982
	},
	{
		quote: 'They call me Mister Tibbs!',
		title: 'IN THE HEAT OF THE NIGHT',
		year: 1967
	},
	{
		quote: 'Rosebud.',
		title: 'CITIZEN KANE',
		year: 1941
	},
	{
		quote: 'Made it, Ma! Top of the world!',
		title: 'WHITE HEAT',
		year: 1949
	},
	{
		quote: "I'm as mad as hell, and I'm not going to take this anymore!",
		title: 'NETWORK',
		year: 1976
	},
	{
		quote: 'Louis, I think this is the beginning of a beautiful friendship.',
		title: 'CASABLANCA',
		year: 1942
	},
	{
		quote: 'A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.',
		title: 'THE SILENCE OF THE LAMBS',
		year: 1991
	},
	{
		quote: 'Bond. James Bond.',
		title: 'DR. NO',
		year: 1962
	},
	{
		quote: "There's no place like home.",
		title: 'THE WIZARD OF OZ',
		year: 1939
	},
	{
		quote: "I am big! It's the pictures that got small.",
		title: 'SUNSET BLVD.',
		year: 1950
	},
	{
		quote: 'Show me the money!',
		title: 'JERRY MAGUIRE',
		year: 1996
	},
	{
		quote: "Why don't you come up sometime and see me?",
		title: 'SHE DONE HIM WRONG',
		year: 1933
	},
	{
		quote: "I'm walking here! I'm walking here!",
		title: 'MIDNIGHT COWBOY',
		year: 1969
	},
	{
		quote: "Play it, Sam. Play 'As Time Goes By.'",
		title: 'CASABLANCA',
		year: 1942
	},
	{
		quote: "You can't handle the truth!",
		title: 'A FEW GOOD MEN',
		year: 1992
	},
	{
		quote: 'I want to be alone.',
		title: 'GRAND HOTEL',
		year: 1932
	},
	{
		quote: 'After all, tomorrow is another day!',
		title: 'GONE WITH THE WIND',
		year: 1939
	},
	{
		quote: 'Round up the usual suspects.',
		title: 'CASABLANCA',
		year: 1942
	},
	{
		quote: "I'll have what she's having.",
		title: 'WHEN HARRY MET SALLY',
		year: 1989
	},
	{
		quote: "You know how to whistle, don't you, Steve? You just put your lips together and blow.",
		title: 'TO HAVE AND HAVE NOT',
		year: 1944
	},
	{
		quote: "You're gonna need a bigger boat.",
		title: 'JAWS',
		year: 1975
	},
	{
		quote: "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!",
		title: 'THE TREASURE OF THE SIERRA MADRE',
		year: 1948
	},
	{
		quote: "I'll be back.",
		title: 'THE TERMINATOR',
		year: 1984
	},
	{
		quote: 'Today, I consider myself the luckiest man on the face of the earth.',
		title: 'THE PRIDE OF THE YANKEES',
		year: 1942
	},
	{
		quote: 'If you build it, he will come.',
		title: 'FIELD OF DREAMS',
		year: 1989
	},
	{
		quote: "My mama always said life was like a box of chocolates. You never know what you're gonna get.",
		title: 'FORREST GUMP',
		year: 1994
	},
	{
		quote: 'We rob banks.',
		title: 'BONNIE AND CLYDE',
		year: 1967
	},
	{
		quote: 'Plastics.',
		title: 'THE GRADUATE',
		year: 1967
	},
	{
		quote: "We'll always have Paris.",
		title: 'CASABLANCA',
		year: 1942
	},
	{
		quote: 'I see dead people.',
		title: 'THE SIXTH SENSE',
		year: 1999
	},
	{
		quote: 'Stella! Hey, Stella!',
		title: 'A STREETCAR NAMED DESIRE',
		year: 1951
	},
	{
		quote: "Oh, Jerry, don't let's ask for the moon. We have the stars.",
		title: 'NOW, VOYAGER',
		year: 1942
	},
	{
		quote: 'Shane. Shane. Come back!',
		title: 'SHANE',
		year: 1953
	},
	{
		quote: "Well, nobody's perfect.",
		title: 'SOME LIKE IT HOT',
		year: 1959
	},
	{
		quote: "It's alive! It's alive!",
		title: 'FRANKENSTEIN',
		year: 1931
	},
	{
		quote: 'Houston, we have a problem.',
		title: 'APOLLO 13',
		year: 1995
	},
	{
		quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
		title: 'DIRTY HARRY',
		year: 1971
	},
	{
		quote: "You had me at 'hello.'",
		title: 'JERRY MAGUIRE',
		year: 1996
	},
	{
		quote: "One morning I shot an elephant in my pajamas. How he got in my pajamas, I don't know.",
		title: 'ANIMAL CRACKERS',
		year: 1930
	},
	{
		quote: "There's no crying in baseball!",
		title: 'A LEAGUE OF THEIR OWN',
		year: 1992
	},
	{
		quote: 'La-dee-da, la-dee-da.',
		title: 'ANNIE HALL',
		year: 1977
	},
	{
		quote: "A boy's best friend is his mother.",
		title: 'PSYCHO',
		year: 1960
	},
	{
		quote: 'Greed, for lack of a better word, is good.',
		title: 'WALL STREET',
		year: 1987
	},
	{
		quote: 'Keep your friends close, but your enemies closer.',
		title: 'THE GODFATHER PART II',
		year: 1974
	},
	{
		quote: "As God is my witness, I'll never be hungry again.",
		title: 'GONE WITH THE WIND',
		year: 1939
	},
	{
		quote: "Well, here's another nice mess you've gotten me into!",
		title: 'SONS OF THE DESERT',
		year: 1933
	},
	{
		quote: 'Say "hello" to my little friend!',
		title: 'SCARFACE',
		year: 1983
	},
	{
		quote: 'What a dump.',
		title: 'BEYOND THE FOREST',
		year: 1949
	},
	{
		quote: "Mrs. Robinson, you're trying to seduce me. Aren't you?",
		title: 'THE GRADUATE',
		year: 1967
	},
	{
		quote: "Gentlemen, you can't fight in here! This is the War Room!",
		title: 'DR. STRANGELOVE',
		year: 1964
	},
	{
		quote: 'Elementary, my dear Watson.',
		title: 'THE ADVENTURES OF SHERLOCK HOLMES',
		year: 1939
	},
	{
		quote: 'Take your stinking paws off me, you damned dirty ape.',
		title: 'PLANET OF THE APES',
		year: 1968
	},
	{
		quote: 'Of all the gin joints in all the towns in all the world, she walks into mine.',
		title: 'CASABLANCA',
		year: 1942
	},
	{
		quote: "Here's Johnny!",
		title: 'THE SHINING',
		year: 1980
	},
	{
		quote: "They're here!",
		title: 'POLTERGEIST',
		year: 1982
	},
	{
		quote: 'Is it safe?',
		title: 'MARATHON MAN',
		year: 1976
	},
	{
		quote: "Wait a minute, wait a minute. You ain't heard nothin' yet!",
		title: 'THE JAZZ SINGER',
		year: 1927
	},
	{
		quote: 'No wire hangers, ever!',
		title: 'MOMMIE DEAREST',
		year: 1981
	},
	{
		quote: 'Mother of mercy, is this the end of Rico?',
		title: 'LITTLE CAESAR',
		year: 1930
	},
	{
		quote: "Forget it, Jake, it's Chinatown.",
		title: 'CHINATOWN',
		year: 1974
	},
	{
		quote: 'I have always depended on the kindness of strangers.',
		title: 'A STREETCAR NAMED DESIRE',
		year: 1951
	},
	{
		quote: 'Hasta la vista, baby.',
		title: 'TERMINATOR 2: JUDGMENT DAY',
		year: 1991
	},
	{
		quote: 'Soylent Green is people!',
		title: 'SOYLENT GREEN',
		year: 1973
	},
	{
		quote: 'Open the pod bay doors, please, HAL.',
		title: '2001: A SPACE ODYSSEY',
		year: 1968
	},
	{
		quote: "Striker: Surely you can't be serious. Rumack: I am serious...and don't call me Shirley.",
		title: 'AIRPLANE!',
		year: 1980
	},
	{
		quote: 'Yo, Adrian!',
		title: 'ROCKY',
		year: 1976
	},
	{
		quote: 'Hello, gorgeous.',
		title: 'FUNNY GIRL',
		year: 1968
	},
	{
		quote: 'Toga! Toga!',
		title: "NATIONAL LAMPOON'S ANIMAL HOUSE",
		year: 1978
	},
	{
		quote: 'Listen to them. Children of the night. What music they make.',
		title: 'DRACULA',
		year: 1931
	},
	{
		quote: "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.",
		title: 'KING KONG',
		year: 1933
	},
	{
		quote: 'My precious.',
		title: 'THE LORD OF THE RINGS: TWO TOWERS',
		year: 2002
	},
	{
		quote: 'Attica! Attica!',
		title: 'DOG DAY AFTERNOON',
		year: 1975
	},
	{
		quote: "Sawyer, you're going out a youngster, but you've got to come back a star!",
		title: '42ND STREET',
		year: 1933
	},
	{
		quote:
			"Listen to me, mister. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go!",
		title: 'ON GOLDEN POND',
		year: 1981
	},
	{
		quote: "Tell 'em to go out there with all they got and win just one for the Gipper.",
		title: 'KNUTE ROCKNE ALL AMERICAN',
		year: 1940
	},
	{
		quote: 'A martini. Shaken, not stirred.',
		title: 'GOLDFINGER',
		year: 1964
	},
	{
		quote: "Who's on first.",
		title: 'THE NAUGHTY NINETIES',
		year: 1945
	},
	{
		quote:
			"Cinderella story. Outta nowhere. A former greenskeeper, now, about to become the Masters champion. It looks like a mirac...It's in the hole! It's in the hole! It's in the hole!",
		title: 'CADDYSHACK',
		year: 1980
	},
	{
		quote: 'Life is a banquet, and most poor suckers are starving to death!',
		title: 'AUNTIE MAME',
		year: 1958
	},
	{
		quote: 'I feel the need - the need for speed!',
		title: 'TOP GUN',
		year: 1986
	},
	{
		quote: 'Carpe diem. Seize the day, boys. Make your lives extraordinary.',
		title: 'DEAD POETS SOCIETY',
		year: 1989
	},
	{
		quote: 'Snap out of it!',
		title: 'MOONSTRUCK',
		year: 1987
	},
	{
		quote: 'My mother thanks you. My father thanks you. My sister thanks you. And I thank you.',
		title: 'YANKEE DOODLE DANDY',
		year: 1942
	},
	{
		quote: 'Nobody puts Baby in a corner.',
		title: 'DIRTY DANCING',
		year: 1987
	},
	{
		quote: "I'll get you, my pretty, and your little dog, too!",
		title: 'THE WIZARD OF OZ',
		year: 1939
	},
	{
		quote: "I'm the king of the world!",
		title: 'TITANIC',
		year: 1997
	}
];
