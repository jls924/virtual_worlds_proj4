var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 1280, height: 720, backgroundColor: 0x000000});
gameport.appendChild(renderer.view);

var main = new PIXI.Container();
var menu = new PIXI.Container();
var stage = new PIXI.Container();

//Background
var t_background = PIXI.Texture.from("images/coffeeshop.png");
var background = new PIXI.Sprite(t_background);
main.addChild(background);

//Music
var music_vol = 1;
const theme_1 = PIXI.sound.Sound.from('audio/coffeeOnTheWindowSill.mp3');
theme_1.loop = true;
theme_1.play();

//Sounds
const bloop = PIXI.sound.Sound.from('audio/bloop.mp3');
const a_shoot = PIXI.sound.Sound.from('audio/shoot.mp3');
const a_game_over = PIXI.sound.Sound.from('audio/fail.mp3');
const a_hurt = PIXI.sound.Sound.from('audio/hurt.mp3');
const a_big_shot = PIXI.sound.Sound.from('audio/big_shot.mp3');
var sound_vol = 1;

/* * * * * * * * * * * * * * * * * * * * *
 * MAIN MENU                             *
 * Creates the main menu and all of its  *
 * functionality.                        *
 * * * * * * * * * * * * * * * * * * * * */
var menu_bkd = PIXI.Texture.from("images/menu/menu_bkd.png");
var menu_bkd = new PIXI.Sprite(menu_bkd);
menu_bkd.position.x = 736;
menu_bkd.position.y = 64;
menu.addChild(menu_bkd);

var t_menu1 = PIXI.Texture.from("images/menu/menu_inactive1.png");
var t_menu2 = PIXI.Texture.from("images/menu/menu_inactive2.png");
var t_menu3 = PIXI.Texture.from("images/menu/menu_inactive3.png");

//Menu 1
var menu1 = new PIXI.Sprite(t_menu1);
menu_bkd.addChild(menu1);

var play_neutral = PIXI.Texture.from("images/menu/play_neutral.png");
var play_active = PIXI.Texture.from("images/menu/play_active.png");
var options_neutral = PIXI.Texture.from("images/menu/options_neutral.png");
var options_active = PIXI.Texture.from("images/menu/options_active.png");
var credits_neutral = PIXI.Texture.from("images/menu/credits_neutral.png");
var credits_active = PIXI.Texture.from("images/menu/credits_active.png");

var play = new PIXI.Sprite(play_neutral);
play.position.x = 8;
play.position.y = 192;
play.interactive = true;
menu1.addChild(play);

var options = new PIXI.Sprite(options_neutral);
options.position.x = 17;
options.position.y = 305;
options.interactive = true;
menu1.addChild(options);

var credits = new PIXI.Sprite(credits_neutral);
credits.position.x = 10;
credits.position.y = 415;
credits.interactive = true;
menu1.addChild(credits);

menu_bkd.addChild(menu1);

//Menu 2
var menu2 = new PIXI.Sprite(t_menu2);

var t_quiet_neutral = PIXI.Texture.from('images/menu/quieter_neutral.png');
var t_quiet_active = PIXI.Texture.from('images/menu/quieter_active.png');
var t_loud_neutral = PIXI.Texture.from('images/menu/louder_neutral.png');
var t_loud_active = PIXI.Texture.from('images/menu/louder_active.png');
var t_back_neutral = PIXI.Texture.from('images/menu/back_neutral.png');
var t_back_active = PIXI.Texture.from('images/menu/back_active.png');

var t_volume = [];
for (i=1; i<=9; i++)
{
	t_volume[i] = PIXI.Texture.from('images/menu/volume' + i + '.png');
}

//Music Volume
var vol_count1 = 9;
var volume1 = new PIXI.Sprite(t_volume[vol_count1]);
volume1.position.x = 114;
volume1.position.y = 208;
menu2.addChild(volume1);
var quiet1 = new PIXI.Sprite(t_quiet_neutral);
quiet1.position.x = 20;
quiet1.position.y = 198;
quiet1.interactive = true;
menu2.addChild(quiet1);
var loud1 = new PIXI.Sprite(t_loud_neutral);
loud1.position.x = 387;
loud1.position.y = 199;
loud1.interactive = true;
menu2.addChild(loud1);

//Effects Volume
var vol_count2 = 9;
var volume2 = new PIXI.Sprite(t_volume[vol_count2]);
volume2.position.x = 114;
volume2.position.y = 387;
menu2.addChild(volume2);
var quiet2 = new PIXI.Sprite(t_quiet_neutral);
quiet2.position.x = 20;
quiet2.position.y = 377;
quiet2.interactive = true;
menu2.addChild(quiet2);
var loud2 = new PIXI.Sprite(t_loud_neutral);
loud2.position.x = 387;
loud2.position.y = 378;
loud2.interactive = true;
menu2.addChild(loud2);

//Back button
var opt_back = new PIXI.Sprite(t_back_neutral);
opt_back.position.x = 174;
opt_back.position.y = 528;
opt_back.interactive = true;
menu2.addChild(opt_back);

//Menu 3
var menu3 = new PIXI.Sprite(t_menu3);
var cred_back = new PIXI.Sprite(t_back_neutral);
cred_back.position.x = 204;
cred_back.position.y = 528;
cred_back.interactive = true;
menu3.addChild(cred_back);

//Start main menu
main.addChild(menu);

//Menu interactives behavior
play.hitArea = new PIXI.Rectangle(0, 0, 128, 64);
play.mouseover = function(ev)
{
	play.texture = play_active;
	bloop.play();
}
play.mouseout = function(ev)
{
	play.texture = play_neutral;
}
play.mousedown = function(ev)
{
	main.removeChild(menu);
	main.addChild(stage);
}

options.hitArea = new PIXI.Rectangle(0, 0, 220, 64);
options.mouseover = function(ev)
{
	options.texture = options_active;
	bloop.play();
}
options.mouseout = function(ev)
{
	options.texture = options_neutral;
}
options.mousedown = function(ev)
{
	menu_bkd.removeChild(menu1);
	menu_bkd.addChild(menu2);
}

credits.hitArea = new PIXI.Rectangle(0, 0, 200, 64);
credits.mouseover = function(ev)
{
	credits.texture = credits_active;
	bloop.play();
}
credits.mouseout = function(ev)
{
	credits.texture = credits_neutral;
}
credits.mousedown = function(ev)
{
	menu_bkd.removeChild(menu1);
	menu_bkd.addChild(menu3);
}

quiet1.hitArea = new PIXI.Rectangle(0, 0, 75, 53);
quiet1.mouseover = function(ev)
{
	quiet1.texture = t_quiet_active;
	bloop.play();
}
quiet1.mouseout = function(ev)
{
	quiet1.texture = t_quiet_neutral;
}
quiet1.mousedown = function(ev)
{
	if (music_vol > 0)
	{
		music_vol -= 0.125;
		theme_1.volume = music_vol;
		vol_count1 -= 1;
		volume1.texture = t_volume[vol_count1];
	}
}

loud1.hitArea = new PIXI.Rectangle(0, 0, 75, 53);
loud1.mouseover = function(ev)
{
	loud1.texture = t_loud_active;
	bloop.play();
}
loud1.mouseout = function(ev)
{
	loud1.texture = t_loud_neutral;
}
loud1.mousedown = function(ev)
{
	if (music_vol < 1)
	{
		music_vol += 0.125;
		theme_1.volume = music_vol;
		vol_count1 += 1;
		volume1.texture = t_volume[vol_count1];
	}
}

quiet2.hitArea = new PIXI.Rectangle(0, 0, 75, 53);
quiet2.mouseover = function(ev)
{
	quiet2.texture = t_quiet_active;
	bloop.play();
}
quiet2.mouseout = function(ev)
{
	quiet2.texture = t_quiet_neutral;
}
quiet2.mousedown = function(ev)
{
	if (sound_vol > 0)
	{
		sound_vol -= 0.125;
		bloop.volume = sound_vol;
		bloop.play();
		a_shoot.volume = sound_vol;
		a_game_over.volume = sound_vol;
		a_hurt.volume = sound_vol;
		a_big_shot.volume = sound_vol;
		vol_count2 -= 1;
		volume2.texture = t_volume[vol_count2];
	}
}

loud2.hitArea = new PIXI.Rectangle(0, 0, 75, 53);
loud2.mouseover = function(ev)
{
	loud2.texture = t_loud_active;
	bloop.play();
}
loud2.mouseout = function(ev)
{
	loud2.texture = t_loud_neutral;
}
loud2.mousedown = function(ev)
{
	if (sound_vol < 1)
	{
		sound_vol += 0.125;
		bloop.volume = sound_vol;
		bloop.play();
		a_shoot.volume = sound_vol;
		a_game_over.volume = sound_vol;
		a_hurt.volume = sound_vol;
		a_big_shot.volume = sound_vol;
		vol_count2 += 1;
		volume2.texture = t_volume[vol_count2];
	}
}

opt_back.hitArea = new PIXI.Rectangle(0, 0, 120, 45);
opt_back.mouseover = function(ev)
{
	opt_back.texture = t_back_active;
	bloop.play();
}
opt_back.mouseout = function(ev)
{
	opt_back.texture = t_back_neutral;
}
opt_back.mousedown = function(ev)
{
	menu_bkd.removeChild(menu2);
	menu_bkd.addChild(menu1);
}

cred_back.hitArea = new PIXI.Rectangle(0, 0, 120, 45);
cred_back.mouseover = function(ev)
{
	cred_back.texture = t_back_active;
	bloop.play();
}
cred_back.mouseout = function(ev)
{
	cred_back.texture = t_back_neutral;
}
cred_back.mousedown = function(ev)
{
	menu_bkd.removeChild(menu3);
	menu_bkd.addChild(menu1);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * TEXT ELEMENTS                                             *
 * This is the portion where the main text area and story is *
 * initialized, including all interactions                   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//Story logic - first is who is talking (h = Hera, v = Vera, b = Barista, o = Hera (V.O.), and 0 is nothing), and second is what music/sound is playing
//0 = silence, 1 = "Autumn Leaves" lofi, 2 = pedantic, 3 = dogsong, 4 = water splash, 5 = table slam
//0 is blackness, 1 is empty coffee shop, 2 is with Hera and Vera
var logic = 
[
	"o0",
	"o0",
	"o0",
	"o0",
	"01", //5
	"o1",
	"b1",
	"v1",
	"b1",
	"v1", //10
	"b1",
	"v1",
	"b1",
	"v1",
	"b1", //15
	"v1",
	"b1",
	"o1",
	"o1",
	"02", //20
	"h1",
	"v1",
	"h1",
	"h1",
	"o1", //25
	"v1",
	"o1",
	"v1",
	"h1",
	"v1", //30
	"h1",
	"o1",
	"v1",
	"h1",
	"v1", //35
	"h1",
	"o1",
	"v1",
	"h1",
	"v1", //40
	"h1",
	"o1",
	"h1",
	"v1",
	"h1",
	"v1",
	"h1",
	"o1",
	"h1",
	"v1", //50
	"h1",
	"v1",
	"h1",
	"v1",
	"h1",
	"v1",
	"h1",
	"v1",
	"v1",
	"h1", //60
	"v1",
	"h1",
	"o1",
	"h1",
	"05",
	"o4",
	"",
	"",
	"",
	"", //70
	"",
	"",
	"",
	"",
];


//Story and setup
var story = 
[
	"Whenever I see TV shows or movies, love is always the end goal or reward. Main dude has a love interest, she gets stolen by bad person, main guy fights the bad person, love interest conflates fear with love and they live happily ever after.",
	"This is just a story though, mere curiosities of the mind- much more simple than real situations we encounter. Even after starting to date, there's still feelings to be considered, pasts to learn about, gifts to give... and riddles to be solved.",
	"My name is Hera Contrara, and this is the story of the woman I fell in love with.",
	"... ..." //5
	"It all started with my morning coffee. I was about to head in, and she, Vera, ordered her drink. She seemed to come a few minutes earlier than me.",
	"Hello! What can I do to get you started?"
	"Hi, so what exactly is this place? There was no name or sign for this shop out front.",
	"Hell if I know. We have coffee and tea, if that's what you're asking.",
	"...Right. I guess I'll order one of those then?", //10
	"That's the spirit! So what are you feeling like?",
	"I think I'll get a loose leaf tea.",
	"Finally someone gets tea! Sometimes coffee can just suck, especially with how complicated the orders can be.",
	"But didn't you choose to work here?",
	"Hey, you gotta pay that student debt somehow.", //15
	"Ouch...",
	"Ouch indeed. Anyways, the total is $3.36.",
	"Once she paid for the tea, she went over to the other side of the counter to wait. Eventually, she heard her name called.",
	"At the same time as getting her tea and going to find a seat though, I walked through the door. All of a sudden..."
	"*SPLOOSH*", //20
	"...Shit.",
	"Oh no no no no, I am so sorry!",
	"Jesus! I'm surprised you didn't see...",
	"...me coming...",
	"I was going to start to complain, but this was different. For once in my life, I stopped thinking.", //25
	"You're right you're right, just come with me for a second. I am so incredibly sorry!",
	"She got me some napkins to wipe myself off, and tried to help wiping off some of the tea herself.",
	"Are you doing okay?",
	"...I'm doing okay, thanks though.",
	"Are you sure?", //30
	"This jacket is pretty hot as is, so I think you actually cooled me down with that tea.",
	"She let out a little giggle, and it was way too cute hnnnggg",
	"Oh thank God, I thought I hurt you. Well, have you gotten anything to drink yet? I can get you something to drink to make up for it.",
	"You don't need to do that-",
	"I insist! It's the least I can do for staining your jacket.", //35
	"...You're too kind, thank you.",
	"She came with me and ordered a drink for me and another for herself. I was still slightly in awe of her, and ended up blushing a little.",
	"You okay still?",
	"Oh, yeah. Just hot in this jacket...",
	"*giggle* I see. Well, would you be interested in sitting down with me? You'll be able to take off your jacket for a bit.", //40
	"I don't see why not.",
	"We get our drinks, make sure not to bump into each other again, and start to walk over to an empty table.",
	"So what's your name, by the way?",
	"It's Vera! How about you?",
	"...Hera.",
	"Oh? Do our names really rhyme?",
	"Oddly enough, this isn't the first time that's happened.",
	"We go to sit down right next to the window. The city outside continues to tick as people walk by, cars find their way to their destination, and the windows glimmer with a certain brilliance. I figured I should know more about this stranger who bought me coffee, so I started up a conversation.",
	"So... what do you do for work, Vera?",
	"I'm an archaeologist. How about you?", //50
	"Wait, hold up. You said you're an archaeologist?",
	"Yeah, why?",
	"That's just really cool, I've never met an archeologist. So you dig up old bones and analyze them?",
	"That's one line of work, but I specialize more in digging up old buildings. It's pretty interesting getting an inside look at ancient histories.",
	"No kidding... you have to be making good money from that, given some of those discoveries end up in textbooks.",
	"Unfortunately, I'm only one of the junior archaeologiests, so I'm not making much money right now- I mostly do it out of passion for the career right now.",
	"So you say your finances are... in ruins?",
	"...",
	"Mk- hahahahahaaa!",
	"Glad you liked that one. I was afraid that almost didn't land.", //60
	"Being honest here, I do enjoy me a good pun!",
	"Thank god.",
	"I look out the window again, and a silence starts. Hera decides to break the silence.",
	"Soooo, I've got a bit of a puzzle for you that goes around in the ol' archeologist circles.",
	"*SLAM*",
	"I immediately go from looking out the window to intently focused on her. My heart started to race with adrenalline.",
	"Umm... did I say something?",
	"...",
	"God damn it, sorry to scare you. I just really enjoy puzzles, I guess.",
	"I'd say it's less of a puzzle and more of a riddle, now that I think about it.", //70
	"That's okay.",
	"Okay! Well here's the riddle: I have cities, but no houses. I have forests, but no trees. I have water but no fish. What am I?",
	"...",
	"Hey! You there reading this! Try to solve the puzzle.",
	"END"
];
var storyCount = 1;
var t_text_back = PIXI.Texture.from("images/dialogue_back.png");
var text_back = new PIXI.Sprite(t_text_back);
stage.addChild(text_back);

//Setting up text boxes
const main_style = new PIXI.TextStyle({
    fill: "white",
    fontFamily: "Courier New",
    fontSize: 24,
    wordWrap: true,
    wordWrapWidth: 1240
});
const main_text = new PIXI.Text(story[0], main_style);
main_text.x = 20;
main_text.y = 400;
stage.addChild(main_text);

const name_style = new PIXI.TextStyle({
    fill: "white",
    fontFamily: "Courier New",
    fontSize: 40,
});
const name = new PIXI.Text('Hera', name_style);
name.x = 1040;
name.y = 295;
stage.addChild(name);

/*
//Choice buttons
var choice_neutral = PIXI.Texture.from("images/choice_neutral.png");
var choice_active = PIXI.Texture.from("images/choice_active.png");

var choice1 = new PIXI.Sprite(choice_neutral);
choice1.x = 50;
choice1.y = 400;
stage.addChild(choice1);

var choice2 = new PIXI.Sprite(choice_neutral);
choice2.x = 550;
choice2.y = 400;
stage.addChild(choice2);

var choice3 = new PIXI.Sprite(choice_neutral);
choice3.x = 50;
choice3.y = 500;
stage.addChild(choice3);

var choice4 = new PIXI.Sprite(choice_neutral);
choice4.x = 450;
choice4.y = 500;
stage.addChild(choice4);
*/

var cont_neutral = PIXI.Texture.from("images/continue_neutral.png");
var cont_active = PIXI.Texture.from("images/continue_active.png");
var cont_btn = new PIXI.Sprite(cont_neutral);
cont_btn.position.x = 1000;
cont_btn.position.y = 640;
cont_btn.interactive = true;
stage.addChild(cont_btn);
cont_btn.hitArea = new PIXI.Rectangle(0, 0, 250, 60);
cont_btn.mouseover = function(ev)
{
	cont_btn.texture = cont_active;
}
cont_btn.mouseout = function(ev)
{
	cont_btn.texture = cont_neutral;
}
cont_btn.mousedown = function(ev)
{
	if (storyCount < story.length)
	{
		main_text.text = story[storyCount];
		storyCount++;
	}
}

function animate() 
{
	requestAnimationFrame(animate);
	PIXI.timerManager.update();
	renderer.render(main);
}
animate();

//For each sentence, there has to be a switch in the main text AND with the name
//The size may need to adjust for the barista name
