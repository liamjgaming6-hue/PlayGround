/* HEARTBITE — character and dialogue data.
   All characters are adults. The vore is cartoonish, consensual, and non-graphic. */

export const characters = [
  {
    id: 'mina',
    number: '01',
    name: 'Mina Hoshino',
    handle: '@mina.zip',
    age: 21,
    archetype: 'Pastel Menace',
    tagline: 'Sweet enough to rot your teeth. Dangerous enough to keep you.',
    bio: 'Professional heartbreaker, amateur baker, full-time menace. Mina texts in paragraphs and laughs at her own jokes before she finishes them.',
    quote: 'You look like trouble. I love trouble.',
    palette: {
      accent: '#ff4f9a', accent2: '#ffd0e4', bg1: '#ff9fc6', bg2: '#701c45',
      ink: '#2b0e22', hair: '#ff9ec4', hairShade: '#d94d88', hairLight: '#ffd7e9',
      skin: '#ffe1d2', eye: '#ff3b86', outfit1: '#f7f2ff', outfit2: '#ff5ca8'
    },
    look: { hairStyle: 'twintails', bangs: 'straight', eyeStyle: 'doe', accessory: 'heart', outfit: 'sailor' },
    voice: { label: 'Bubblegum soprano', pitch: 1.62, rate: 1.06, hints: ['Samantha', 'Google US English', 'Microsoft Zira'] },
    belly: { label: 'Syrupy gurgle', base: 94, pulse: 5.1, cutoff: 560, timbre: 'warm' },
    intro: 'You made it! I was starting to think you ghosted me. Which would have been rude, because I already picked out a playlist.',
    winLine: 'Oh no. You filled my whole heart. You know what that means, right?',
    lossLine: 'Aww. You ran out of hearts. Good thing I have a spare stomach.',
    struggleLines: [
      'Hehe— okay, that tickles. Do it again.',
      'You are wiggling like a little gummy bear. I cannot.',
      'Careful in there! That is my favorite hoodie you are squishing.',
      'Aww, is somebody fighting for their life? Cute.',
      'Nope. Mine now. Try again.'
    ],
    idleLines: [
      'The playlist is still going. I think this is our song now.',
      'You can hear my heartbeat if you get quiet. It is a little fast.',
      'My belly just did a whole symphony. You are welcome.',
      'I am not letting you out. I am just... letting you stay.',
      'You feel like a warm little secret. I am keeping you.'
    ],
    leaveLine: 'You are leaving? Fine. But I am texting you in ten minutes.',
    scenes: [
      {
        prompt: 'Okay, important question. If I were a dessert, what would I be? Be honest — I will know.',
        options: [
          { text: 'Something sweet with a dangerous bite. I would risk it.', tone: 'good', reply: 'Dangerous bite! You get it. You are already my favorite flavor.' },
          { text: 'Plain vanilla. Safe and boring.', tone: 'bad', reply: 'Vanilla. In this economy? I am going to pretend you did not say that.' },
          { text: 'Probably a cake? Cakes are nice.', tone: 'neutral', reply: 'Revolutionary. A cake. Truly, the pastry sommelier has spoken.' },
          { text: 'I do not really eat dessert.', tone: 'neutral', reply: 'That is a crime, but okay. Noted. Weirdo.' }
        ]
      },
      {
        prompt: 'My friends say I text too fast. I think they just type too slow. Which one of us is right?',
        options: [
          { text: 'What phone do you use?', tone: 'neutral', reply: 'Samsung. Why are we talking about phones right now?' },
          { text: 'Maybe you should chill out a little.', tone: 'bad', reply: 'Chill? I do not even know her. Wow.' },
          { text: 'You. Obviously. I like someone who keeps up.', tone: 'good', reply: 'See? This is why I like you. Fast fingers, faster heart.' },
          { text: 'I text at a normal speed.', tone: 'neutral', reply: 'Normal is a myth, babe. But sure.' }
        ]
      },
      {
        prompt: 'I made a playlist for tonight. It is 47 songs. Is that too much?',
        options: [
          { text: 'Not enough. I want the extended director cut.', tone: 'good', reply: 'You are getting the bonus tracks. No skips. I am serious.' },
          { text: 'That is a lot of songs.', tone: 'neutral', reply: 'It is a lot of feelings. They needed somewhere to go.' },
          { text: 'I only listen to podcasts.', tone: 'bad', reply: 'A podcast. On our date. I am calling my lawyer.' },
          { text: 'What genre is it?', tone: 'neutral', reply: 'Yes. All of them. That is the genre.' }
        ]
      },
      {
        prompt: 'Be honest. Do I look intimidating?',
        options: [
          { text: 'Not really.', tone: 'bad', reply: 'Noted. I will try harder. Maybe I will start wearing a cape.' },
          { text: 'Terrifying. In the cutest possible way.', tone: 'good', reply: 'Correct answer. I will allow you to keep your heart.' },
          { text: 'What is your height?', tone: 'neutral', reply: 'Five-two. Five-three with the boots. Why are you like this?' },
          { text: 'You look like a person.', tone: 'neutral', reply: 'A person. Wow. Poetic. I am blushing.' }
        ]
      },
      {
        prompt: 'If I told you I could fit you in my pocket, would you be scared or flattered?',
        options: [
          { text: 'Flattered. But I get the window seat.', tone: 'good', reply: 'Deal. I will even poke air holes. See? I am a good host.' },
          { text: 'That is a weird thing to say.', tone: 'bad', reply: 'Weird? I am whimsical. There is a difference.' },
          { text: 'How big is the pocket?', tone: 'neutral', reply: 'Deep. Suspiciously deep. Stop asking questions.' },
          { text: 'I am not sure what that means.', tone: 'neutral', reply: 'It means I am cute and mysterious. Keep up, babe.' }
        ]
      },
      {
        prompt: 'I have a very specific type. Guess it.',
        options: [
          { text: 'Tall. Everyone says tall.', tone: 'bad', reply: 'Boring. Also wrong. Next.' },
          { text: 'Someone who makes you laugh and does not flinch when you bite.', tone: 'good', reply: 'Stop. That is actually perfect. I hate how perfect that is.' },
          { text: 'Do you mean hair color?', tone: 'neutral', reply: 'Sure. Hair color. That is definitely what I meant.' },
          { text: 'I give up.', tone: 'neutral', reply: 'Giving up on the first date? Bold strategy.' }
        ]
      },
      {
        prompt: 'You are quiet. Plotting something?',
        options: [
          { text: 'No.', tone: 'bad', reply: 'Just no? Okay. I will sit here with my thoughts and my disappointment.' },
          { text: 'Just calculating how lucky I got.', tone: 'good', reply: 'Correct. And the math checks out. You are very lucky.' },
          { text: 'I am thinking about dinner.', tone: 'neutral', reply: 'Same. But my dinner thoughts are more... specific.' },
          { text: 'What do you want to talk about?', tone: 'neutral', reply: 'Hmm. You. Mostly. But you have to work for it.' }
        ]
      },
      {
        prompt: 'Last question. Are you the kind of person who stays for breakfast?',
        options: [
          { text: 'Depends. Are you the kind who swallows me whole?', tone: 'good', reply: 'Oh, you are trouble. The best kind. I am keeping you.' },
          { text: 'I usually leave before breakfast.', tone: 'bad', reply: 'Good to know. I will set an alarm. For you. So you do not leave.' },
          { text: 'What is for breakfast?', tone: 'neutral', reply: 'Whatever is in the fridge. Or whoever. Kidding. Mostly.' },
          { text: 'I do not eat breakfast.', tone: 'neutral', reply: 'Another crime. You are collecting them.' }
        ]
      }
    ]
  },
  {
    id: 'aiko',
    number: '02',
    name: 'Aiko.exe',
    handle: '@aiko_404',
    age: 22,
    archetype: 'Cyber Gremlin',
    tagline: 'Will beat you at Mario Kart, then ask you to stay.',
    bio: 'Twitch affiliate, energy-drink sommelier, and the reason your Wi-Fi is acting strange. Aiko flirts in patch notes and has never lost an argument she started.',
    quote: 'I am not competitive. I am just always right.',
    palette: {
      accent: '#22e7ff', accent2: '#b8f9ff', bg1: '#1d6bff', bg2: '#061834',
      ink: '#06152d', hair: '#49d9ff', hairShade: '#1479b9', hairLight: '#c6f8ff',
      skin: '#f8d7c5', eye: '#15e5ff', outfit1: '#111a38', outfit2: '#25c9f6'
    },
    look: { hairStyle: 'bob', bangs: 'side', eyeStyle: 'sharp', accessory: 'headset', outfit: 'hoodie' },
    voice: { label: 'Glitchy alto', pitch: 1.36, rate: 1.18, hints: ['Google UK English Female', 'Microsoft Hazel', 'Samantha'] },
    belly: { label: 'Digital burble', base: 72, pulse: 6.4, cutoff: 880, timbre: 'digital' },
    intro: 'You actually showed up. I had a whole bit planned for if you stood me up. It involved a fake crying stream.',
    winLine: 'Love meter full. Achievement unlocked: human dessert.',
    lossLine: 'Zero hearts. You have been voted off the island. And into the stomach.',
    struggleLines: [
      'Chat, he is wiggling. This is so not PG.',
      'Hehe— stop, my stream is going to hear you.',
      'That is a soft reset, not a struggle.',
      'You are literally in my stomach. What is your plan here?',
      'I am going to clip that. The wiggle. Definitely the wiggle.'
    ],
    idleLines: [
      'I could stream this. I will not. This is premium content.',
      'My stomach is making dial-up noises. That is your fault.',
      'You are warm. My PC is not. This is an upgrade.',
      'I am going AFK. Do not go anywhere. You cannot anyway.',
      'New patch note: boyfriend now lives in stomach. Known issue: none.'
    ],
    leaveLine: 'You are leaving? I am clipping that. For morale.',
    scenes: [
      {
        prompt: 'I have been staring at this code for six hours. Guess what is broken.',
        options: [
          { text: 'Your sleep schedule.', tone: 'good', reply: 'Ha. Correct, but rude. I am putting that in the patch notes.' },
          { text: 'The code?', tone: 'neutral', reply: 'Wow. Tech support has arrived. Thank you for your service.' },
          { text: 'I do not know anything about code.', tone: 'neutral', reply: 'That is fine. I do not know anything about being normal.' },
          { text: 'Maybe you are just bad at it.', tone: 'bad', reply: 'Wow. A software critique and a personal attack. Efficient.' }
        ]
      },
      {
        prompt: 'My stream chat says I am unhinged. I think they mean iconic.',
        options: [
          { text: 'I think they mean unhinged.', tone: 'bad', reply: 'Okay, wow, no need to side with chat. Traitor.' },
          { text: 'Iconic. Obviously.', tone: 'good', reply: 'Thank you. Finally, someone with taste and a working monitor.' },
          { text: 'How many viewers do you have?', tone: 'neutral', reply: 'Enough to be embarrassing when I trip over nothing.' },
          { text: 'What do you stream?', tone: 'neutral', reply: 'Chaos. Occasionally games. Mostly chaos.' }
        ]
      },
      {
        prompt: 'If I challenged you to a 1v1, would you let me win?',
        options: [
          { text: 'Absolutely not. I would destroy you.', tone: 'good', reply: 'Oh, I like that. Confidence. Wrong, but hot.' },
          { text: 'Sure. I do not care.', tone: 'bad', reply: 'You do not care? I am not dating a casual. Get out.' },
          { text: 'What game?', tone: 'neutral', reply: 'The one where I win. Any of them. Pick one.' },
          { text: 'I am not very good at games.', tone: 'neutral', reply: 'That is okay. I can teach you. For a fee.' }
        ]
      },
      {
        prompt: 'I have not slept. But my skin is glowing. Explain that.',
        options: [
          { text: 'It is the lighting.', tone: 'neutral', reply: 'The lighting. You are lucky you are cute.' },
          { text: 'You are powered by spite and caffeine.', tone: 'good', reply: 'Finally, someone who understands my build. I am unstoppable.' },
          { text: 'Go to sleep.', tone: 'bad', reply: 'Go to sleep? On our date? Wow. Romantic.' },
          { text: 'What is your skincare routine?', tone: 'neutral', reply: 'Energy drinks and denial. It is a family recipe.' }
        ]
      },
      {
        prompt: 'What is your gamer tag? If it is xXDarkSlayerXx, I am leaving.',
        options: [
          { text: 'It is exactly xXDarkSlayerXx.', tone: 'bad', reply: 'I am leaving. I am kidding. But I am judging you so hard.' },
          { text: 'I will tell you after you beat me.', tone: 'good', reply: 'Deal. And I will beat you. Then you have to tell me everything.' },
          { text: 'I do not have one.', tone: 'neutral', reply: 'No tag? That is either mysterious or deeply suspicious.' },
          { text: 'Why do you want to know?', tone: 'neutral', reply: 'So I can stalk you. I mean. So we can play. Obviously.' }
        ]
      },
      {
        prompt: 'Would you still like me if I was a worm?',
        options: [
          { text: 'I would put you in a little terrarium.', tone: 'good', reply: 'That is the most romantic thing anyone has ever said to me. Ever.' },
          { text: 'No.', tone: 'bad', reply: 'No? Just no? I am a worm and you are dead to me.' },
          { text: 'Why would you be a worm?', tone: 'neutral', reply: 'It is a hypothetical. Try to keep up with the lore.' },
          { text: 'I do not like worms.', tone: 'neutral', reply: 'Noted. Wormphobe. I am writing that down.' }
        ]
      },
      {
        prompt: 'I am hungry. This is a warning, not a question.',
        options: [
          { text: 'Should I be worried?', tone: 'good', reply: 'Worried? No. Flattered? Maybe. Stay close and find out.' },
          { text: 'Order something then.', tone: 'bad', reply: 'Order something. On our date. Wow. You are lucky you are pretty.' },
          { text: 'What are you hungry for?', tone: 'neutral', reply: 'You are asking a lot of questions for someone in biting range.' },
          { text: 'I ate already.', tone: 'neutral', reply: 'Cool. Good for you. I am still hungry.' }
        ]
      },
      {
        prompt: 'You are staring at my headphones. They are cat ears. Deal with it.',
        options: [
          { text: 'I was staring at you, not the headphones.', tone: 'good', reply: 'Smooth. Disgusting. Do it again.' },
          { text: 'They are weird.', tone: 'bad', reply: 'Weird? They are a lifestyle. You would not get it.' },
          { text: 'Where did you get them?', tone: 'neutral', reply: 'Online. Where do you think? The cat-ear store?' },
          { text: 'I did not notice.', tone: 'neutral', reply: 'You did not notice the giant cat ears. Sure.' }
        ]
      }
    ]
  },
  {
    id: 'sora',
    number: '03',
    name: 'Sora Lune',
    handle: '@sora.nights',
    age: 23,
    archetype: 'Sleepy Stargazer',
    tagline: 'A soft place to land. A very warm place to stay.',
    bio: 'Planetarium regular, blanket thief, and collector of small secrets. Sora speaks in half-dreams and remembers everything you say.',
    quote: 'The moon is beautiful tonight. You are okay too.',
    palette: {
      accent: '#b79cff', accent2: '#e7deff', bg1: '#8e75ff', bg2: '#2b1e56',
      ink: '#1c1437', hair: '#bba4ff', hairShade: '#7257c7', hairLight: '#e9e0ff',
      skin: '#f4d9cd', eye: '#a183ff', outfit1: '#2a2552', outfit2: '#bba4ff'
    },
    look: { hairStyle: 'long', bangs: 'curtain', eyeStyle: 'sleepy', accessory: 'stars', outfit: 'sweater' },
    voice: { label: 'Velvet whisper', pitch: 1.08, rate: 0.84, hints: ['Victoria', 'Google UK English Female', 'Samantha'] },
    belly: { label: 'Deep-space rumble', base: 61, pulse: 3.6, cutoff: 380, timbre: 'soft' },
    intro: 'Oh. You are here. I was watching the moon and thinking about you. The moon did not mind.',
    winLine: 'Your heart is so full. Mine is too. And my stomach is very empty.',
    lossLine: 'The stars went out. I suppose I will have to keep you somewhere darker.',
    struggleLines: [
      'Hehe... you are a restless little constellation.',
      'That was a very sleepy struggle. I appreciate the effort.',
      'Shh. The stars are watching. Be a good little moon.',
      'You are moving. It feels like a heartbeat with legs.',
      'Oh. You are ticklish there. Interesting.'
    ],
    idleLines: [
      'I could fall asleep like this. With you right there.',
      'The walls are warm. Or maybe that is just me.',
      'I saw a shooting star earlier. I wished for something like this.',
      'Stay. The night is long and my heart is quiet.',
      'You are the smallest room I have ever loved.'
    ],
    leaveLine: 'Leaving is allowed. I will just miss you in lowercase.',
    scenes: [
      {
        prompt: 'Do you ever look at the moon and feel like it is looking back?',
        options: [
          { text: 'That is a little creepy.', tone: 'bad', reply: 'Creepy. The moon is heartbroken now.' },
          { text: 'Yes. Especially when it is full.', tone: 'good', reply: 'Exactly. Someone gets it. Come look with me sometime.' },
          { text: 'I do not really look at the moon.', tone: 'neutral', reply: 'That is okay. The moon is used to being ignored.' },
          { text: 'What phase is it tonight?', tone: 'neutral', reply: 'Waxing gibbous. Obviously. I am very serious about this.' }
        ]
      },
      {
        prompt: 'I brought a blanket. We can share. Or not. I am not a monster.',
        options: [
          { text: 'I would like to share.', tone: 'good', reply: 'Good. You are officially a blanket person now. No takebacks.' },
          { text: 'I do not get cold.', tone: 'neutral', reply: 'Okay, tough guy. The blanket is still here if you change your mind.' },
          { text: 'Why did you bring a blanket?', tone: 'neutral', reply: 'For the same reason I brought snacks. I plan ahead.' },
          { text: 'That seems unnecessary.', tone: 'bad', reply: 'Unnecessary. Like a nice moment. Got it.' }
        ]
      },
      {
        prompt: 'I named a star after my ex. Then I renamed it after a sandwich.',
        options: [
          { text: 'What kind of sandwich?', tone: 'neutral', reply: 'Turkey and regret. It is a very specific star.' },
          { text: 'That is the most you thing I have ever heard.', tone: 'good', reply: 'You get me. That is terrifying and lovely.' },
          { text: 'Why would you do that?', tone: 'bad', reply: 'Wow. Way to kill the whimsy.' },
          { text: 'You have an ex?', tone: 'neutral', reply: 'Everyone has an ex. Some of us have exes orbiting in space.' }
        ]
      },
      {
        prompt: 'Tell me a secret. Something small. I collect them.',
        options: [
          { text: 'I do not really have secrets.', tone: 'bad', reply: 'Everyone has secrets. That is the first secret you told me.' },
          { text: 'When I was little, I was scared of the dark.', tone: 'good', reply: 'Me too. We can be scared together. That is less scary.' },
          { text: 'Why do you collect them?', tone: 'neutral', reply: 'They are like tiny stars. I keep them in a jar in my head.' },
          { text: 'What is your favorite color?', tone: 'neutral', reply: 'That is not a secret. But it is lilac. Now you know.' }
        ]
      },
      {
        prompt: 'It is 2 a.m. The best time for bad decisions and good company.',
        options: [
          { text: 'I should probably go home.', tone: 'bad', reply: 'Home. At 2 a.m. When there is a blanket. Tragic.' },
          { text: 'Then I am exactly where I should be.', tone: 'good', reply: 'Yes. You are. And I am not letting the night end yet.' },
          { text: 'I am usually asleep by now.', tone: 'neutral', reply: 'Sleep is a scam. But it is a nice scam. I respect it.' },
          { text: 'What is your sleep schedule?', tone: 'neutral', reply: 'Yes. That is the answer. Yes.' }
        ]
      },
      {
        prompt: 'I cannot tell if I am tired or just emotionally horizontal.',
        options: [
          { text: 'That makes no sense.', tone: 'bad', reply: 'It makes perfect sense. You are just not on my level.' },
          { text: 'You can lean on me. Horizontally.', tone: 'good', reply: 'Oh no. That was smooth. I am blushing into another dimension.' },
          { text: 'Maybe you need coffee.', tone: 'neutral', reply: 'Coffee would make me vibrate. You do not want that.' },
          { text: 'How much sleep did you get?', tone: 'neutral', reply: 'Enough. Define enough. Do not define enough.' }
        ]
      },
      {
        prompt: 'Your voice is very... hmm. Keep talking.',
        options: [
          { text: 'About what?', tone: 'neutral', reply: 'Anything. Just let the words fall out of your face.' },
          { text: 'I could read you the dictionary.', tone: 'bad', reply: 'The dictionary. My favorite bedtime story. Not.' },
          { text: 'I like the way you listen.', tone: 'good', reply: 'I am good at listening. I am better at keeping.' },
          { text: 'You are weird.', tone: 'neutral', reply: 'Weird is just a word. I prefer "liminal."' }
        ]
      },
      {
        prompt: 'If we got stuck in a dream together, would you wake me up?',
        options: [
          { text: 'No. I would stay.', tone: 'good', reply: 'Good. I would keep you. Dreams are very spacious inside.' },
          { text: 'I would wake you up immediately.', tone: 'bad', reply: 'Immediately. Wow. No romance. Just alarm clock energy.' },
          { text: 'Can you get stuck in a dream?', tone: 'neutral', reply: 'I can get stuck anywhere. It is a talent.' },
          { text: 'I do not remember my dreams.', tone: 'neutral', reply: 'That is sad. I have a spare dream if you want one.' }
        ]
      }
    ]
  },
  {
    id: 'rumi',
    number: '04',
    name: 'Rumi Koda',
    handle: '@rumi.runs',
    age: 22,
    archetype: 'Track Team Heat',
    tagline: 'Runs fast, falls hard, holds on tight.',
    bio: 'Sprinter, smoothie criminal, and the most competitive person in any room. Rumi will turn a board game into a blood sport and then ask if you are okay.',
    quote: 'You look like you skip leg day. Prove me wrong.',
    palette: {
      accent: '#ff8a5b', accent2: '#ffd4bf', bg1: '#ff9a5c', bg2: '#681e14',
      ink: '#30120c', hair: '#ff835c', hairShade: '#c9442e', hairLight: '#ffc09e',
      skin: '#f2c6a7', eye: '#53c96b', outfit1: '#f8f6ef', outfit2: '#ff6f44'
    },
    look: { hairStyle: 'ponytail', bangs: 'spiky', eyeStyle: 'sporty', accessory: 'headband', outfit: 'track' },
    voice: { label: 'Sunny closer', pitch: 1.44, rate: 1.12, hints: ['Microsoft Zira', 'Samantha', 'Google US English'] },
    belly: { label: 'Thunderous churn', base: 111, pulse: 7.1, cutoff: 720, timbre: 'punchy' },
    intro: 'You are late. I already did my warm-up, two laps, and a set of lunges. You are lucky you are cute.',
    winLine: 'Full meter. You win. Which means I get to eat you. House rules.',
    lossLine: 'You lost. You know what happens to losers on my route? They get eaten.',
    struggleLines: [
      'Hehe— oh, you are feisty! I respect that.',
      'That is barely a struggle. I have done harder sit-ups.',
      'You are wiggling? Cute. My abs are not even flexed.',
      'Oh! Right there. That tickles. Do not stop.',
      'Keep going. I am counting it as cardio.'
    ],
    idleLines: [
      'My heart is still racing from the date. Or from you.',
      'This is the only kind of rest day I approve of.',
      'You are warm. Like a little personal sauna.',
      'I could go another round. You up for it?',
      'I think my stomach just won a race. Against itself.'
    ],
    leaveLine: 'Leaving? Fine. But I am winning the rematch.',
    scenes: [
      {
        prompt: 'I ran six miles today. Then I thought about you for one. Beat that.',
        options: [
          { text: 'I ran ten.', tone: 'bad', reply: 'Ten? Ten what? Miles? Minutes? I need details, champ.' },
          { text: 'I thought about you for six.', tone: 'good', reply: 'Six! Okay, you win this round. I am swooning. Do not tell anyone.' },
          { text: 'That sounds exhausting.', tone: 'neutral', reply: 'Exhausting is just success with sweat. You will learn.' },
          { text: 'What route do you run?', tone: 'neutral', reply: 'The one with the least people. And the most dogs.' }
        ]
      },
      {
        prompt: 'You look like you skip leg day. Prove me wrong.',
        options: [
          { text: 'I do not skip anything.', tone: 'good', reply: 'Ooh, confident. Let me see those calves. I am joking. Mostly.' },
          { text: 'Leg day is a myth.', tone: 'bad', reply: 'A myth? You are a myth. A cautionary tale.' },
          { text: 'What is leg day?', tone: 'neutral', reply: 'That explains so much. So much.' },
          { text: 'I walk a lot.', tone: 'neutral', reply: 'Walking. Adorable. The gateway drug to running.' }
        ]
      },
      {
        prompt: 'I am competitive about everything. Even breathing. Especially breathing.',
        options: [
          { text: 'I bet I can breathe better.', tone: 'good', reply: 'Oh, it is on. You are going down. Then I am going to hold you.' },
          { text: 'That sounds unhealthy.', tone: 'bad', reply: 'Unhealthy? That is quitter talk. I am built different.' },
          { text: 'How do you compete at breathing?', tone: 'neutral', reply: 'I am winning right now. Look at me. Incredible.' },
          { text: 'Do you ever relax?', tone: 'neutral', reply: 'I relax competitively. I am the best at it.' }
        ]
      },
      {
        prompt: 'If I beat you at arm wrestling, you are buying dinner. If I lose, you are still buying dinner.',
        options: [
          { text: 'That is not fair.', tone: 'bad', reply: 'Fair? I am an athlete. Fair is for people who lose.' },
          { text: 'Deal. But I want a rematch after.', tone: 'good', reply: 'A rematch. I like you. You are stubborn. It is hot.' },
          { text: 'Where are we eating?', tone: 'neutral', reply: 'Somewhere with carbs. Lots of carbs. I am not sharing.' },
          { text: 'You are going to win, right?', tone: 'neutral', reply: 'I mean. Obviously. Are you new?' }
        ]
      },
      {
        prompt: 'Do you stretch? Be honest.',
        options: [
          { text: 'I stretch sometimes.', tone: 'neutral', reply: 'Sometimes. The most dangerous word in fitness.' },
          { text: 'I can touch my toes.', tone: 'good', reply: 'Prove it. No, wait. Do it later. When I am ready.' },
          { text: 'No.', tone: 'bad', reply: 'No. Just no. I am going to make you stretch. It is for your own good.' },
          { text: 'Why do you ask?', tone: 'neutral', reply: 'Because flexibility is important. For reasons. Do not ask.' }
        ]
      },
      {
        prompt: 'I do not get jealous. I get motivated.',
        options: [
          { text: 'So I should worry?', tone: 'good', reply: 'Worry? No. Be impressed. Maybe a little scared. Healthy amount.' },
          { text: 'That is just jealousy.', tone: 'bad', reply: 'It is not jealousy. It is enthusiasm with a plan.' },
          { text: 'What are you motivated about?', tone: 'neutral', reply: 'Life. Also you. But mostly life. Do not read into it.' },
          { text: 'I do not get jealous either.', tone: 'neutral', reply: 'Sure. We can both be very normal about this.' }
        ]
      },
      {
        prompt: 'I am starving. The post-run hunger is real.',
        options: [
          { text: 'Let us get food.', tone: 'neutral', reply: 'Food. Yes. Finally, someone with solutions.' },
          { text: 'You could eat me.', tone: 'good', reply: 'Ha! Careful. I might take that personally. And literally.' },
          { text: 'Drink some water.', tone: 'bad', reply: 'Water? I am not a plant. I need carbs.' },
          { text: 'What is your favorite food?', tone: 'neutral', reply: 'Pasta. Any pasta. All pasta. Do not make me choose.' }
        ]
      },
      {
        prompt: 'First date rules: no talking about exes. Unless they were really bad.',
        options: [
          { text: 'My ex was a saint.', tone: 'bad', reply: 'A saint. On this date. Do you hear yourself?' },
          { text: 'I would rather talk about you.', tone: 'good', reply: 'Smooth. Very smooth. You are still buying me pasta.' },
          { text: 'Why that rule?', tone: 'neutral', reply: 'Because nobody wants to hear about some random person from the past. Including me.' },
          { text: 'I do not have an ex.', tone: 'neutral', reply: 'No ex? Should I be suspicious or excited?' }
        ]
      }
    ]
  },
  {
    id: 'yuki',
    number: '05',
    name: 'Yuki Shirayuki',
    handle: '@yuki.ice',
    age: 24,
    archetype: 'Ice Princess',
    tagline: 'Cold hands. Warm center. Very low tolerance for small talk.',
    bio: 'Museum curator, matcha purist, and occasional snow queen. Yuki says exactly what she means, which is either the best or worst thing about her.',
    quote: 'I am not cold. I am adequately temperature-controlled.',
    palette: {
      accent: '#8fffe5', accent2: '#d7fff7', bg1: '#9af5e8', bg2: '#153944',
      ink: '#0b252c', hair: '#c8fff6', hairShade: '#68c7bc', hairLight: '#f2fffd',
      skin: '#ffe6da', eye: '#76e4d8', outfit1: '#f7ffff', outfit2: '#74d6cc'
    },
    look: { hairStyle: 'hime', bangs: 'hime', eyeStyle: 'cool', accessory: 'snowflake', outfit: 'blazer' },
    voice: { label: 'Frosted contralto', pitch: 1.0, rate: 0.9, hints: ['Moira', 'Google UK English Female', 'Samantha'] },
    belly: { label: 'Quiet icy rumble', base: 54, pulse: 3.1, cutoff: 340, timbre: 'cool' },
    intro: 'You are six minutes late. I counted. I am not angry. I am simply documenting it for later.',
    winLine: 'My heart is full. How inconvenient. I suppose you will have to stay.',
    lossLine: 'You have lost my heart. I will keep the rest of you.',
    struggleLines: [
      'Hehe. That was almost dignified.',
      'You are moving. My composure is not.',
      'Stop. That tickles. I said stop. I did not mean it.',
      'A struggle? In this economy?',
      'You are very warm. It is ruining my image.'
    ],
    idleLines: [
      'This is not in my schedule. I am making an exception.',
      'It is warm in here. I will allow it.',
      'The museum is closed. You are not going anywhere.',
      'You are quiet. I like that about you.',
      'My stomach is making noise. Do not comment.'
    ],
    leaveLine: 'You may leave. I will not chase you. I will simply wait.',
    scenes: [
      {
        prompt: 'You are late. I have been standing here for six minutes. I counted.',
        options: [
          { text: 'I am sorry. Let me make it up to you.', tone: 'good', reply: 'Apology accepted. Compensation pending. I take matcha and attention.' },
          { text: 'Six minutes is not that long.', tone: 'bad', reply: 'Not that long. I see. I will remember this at the next count.' },
          { text: 'There was traffic.', tone: 'neutral', reply: 'Traffic. A classic. Did it have a name?' },
          { text: 'What do you want me to do?', tone: 'neutral', reply: 'Be here. On time. Preferably warm. That is all.' }
        ]
      },
      {
        prompt: 'I do not do small talk. But I will make an exception for you. Once.',
        options: [
          { text: 'Then let us skip it.', tone: 'good', reply: 'Finally. Someone who understands the value of silence.' },
          { text: 'What is the weather like?', tone: 'bad', reply: 'You had one exception. And you used it on weather.' },
          { text: 'How is your day going?', tone: 'neutral', reply: 'Adequate. I have had worse. I have had better.' },
          { text: 'What do you want to talk about?', tone: 'neutral', reply: 'Anything that is not the weather. Or sports.' }
        ]
      },
      {
        prompt: 'The cafe ran out of matcha. I am considering a lawsuit.',
        options: [
          { text: 'That is a bit dramatic.', tone: 'bad', reply: 'Dramatic. I am protecting the sanctity of matcha.' },
          { text: 'I know another place. I will take you.', tone: 'good', reply: 'You know another place. Hm. You may be useful after all.' },
          { text: 'What will you order instead?', tone: 'neutral', reply: 'Nothing. I will sit in protest. It is a silent protest.' },
          { text: 'Do you like coffee?', tone: 'neutral', reply: 'Coffee is acceptable. In emergencies.' }
        ]
      },
      {
        prompt: 'People say I am cold. I say I am adequately temperature-controlled.',
        options: [
          { text: 'You are definitely cold.', tone: 'bad', reply: 'Definitely. Straight to the point. Are you always this charming?' },
          { text: 'I think you are just honest.', tone: 'good', reply: 'Honest. Yes. That is a much better word. You can stay.' },
          { text: 'Who says that?', tone: 'neutral', reply: 'People. Usually after I decline a hug.' },
          { text: 'What temperature are you?', tone: 'neutral', reply: 'Cool. Not freezing. There is a difference.' }
        ]
      },
      {
        prompt: 'Do you think I am difficult?',
        options: [
          { text: 'A little. But I like it.', tone: 'good', reply: 'A little. That is fair. I will allow you to like it.' },
          { text: 'People can be difficult.', tone: 'neutral', reply: 'A diplomatic answer. I am not a diplomat. Try again.' },
          { text: 'No, you are perfect.', tone: 'bad', reply: 'Perfect. That is a lie. I can smell a lie.' },
          { text: 'What do you mean by difficult?', tone: 'neutral', reply: 'Demanding. Precise. Worth it. Choose one.' }
        ]
      },
      {
        prompt: 'I made two reservations. One in case you were boring.',
        options: [
          { text: 'Which one are we going to?', tone: 'neutral', reply: 'The restaurant. Obviously. You were not boring. Barely.' },
          { text: 'You already planned for me to fail?', tone: 'good', reply: 'I plan for everything. You surprised me. I do not like surprises. I liked this one.' },
          { text: 'That is a little insulting.', tone: 'bad', reply: 'Insulting. I prefer prepared. There is a difference.' },
          { text: 'Where is the other reservation?', tone: 'neutral', reply: 'Somewhere I will not be going. Do not ask.' }
        ]
      },
      {
        prompt: 'My love language is quality time. And quiet.',
        options: [
          { text: 'I can do quiet.', tone: 'good', reply: 'Good. We can be quiet together. That is a promise.' },
          { text: 'I am not good at quiet.', tone: 'bad', reply: 'Then this will be a very long date. For both of us.' },
          { text: 'What is mine, then?', tone: 'neutral', reply: 'You tell me. I am not a mind reader. Only a curator.' },
          { text: 'Do you like movies?', tone: 'neutral', reply: 'Some. Mostly the quiet parts.' }
        ]
      },
      {
        prompt: 'Would you like to know a secret? It is not very interesting.',
        options: [
          { text: 'I would like to know everything.', tone: 'good', reply: 'Everything. Ambitious. Start with the secret and we will see.' },
          { text: 'Not really.', tone: 'bad', reply: 'Not really. I will remember that. I have a very good memory.' },
          { text: 'Is it about matcha?', tone: 'neutral', reply: 'No. But I respect the guess.' },
          { text: 'Why tell me?', tone: 'neutral', reply: 'Because you asked. And because you are here.' }
        ]
      }
    ]
  },
  {
    id: 'nia',
    number: '06',
    name: 'Nia Sol',
    handle: '@nia.sunset',
    age: 23,
    archetype: 'Sunset DJ',
    tagline: 'Golden hour, loud laugh, softest landing.',
    bio: 'Rooftop DJ, plant parent, and professional over-feeler. Nia makes strangers feel like old friends and old friends feel like home.',
    quote: 'The sun is going down. What is the move?',
    palette: {
      accent: '#ffb23e', accent2: '#ffe2a7', bg1: '#ff9b3d', bg2: '#4a173f',
      ink: '#2b0d20', hair: '#d65c2f', hairShade: '#8e2a1b', hairLight: '#ffb56a',
      skin: '#8a4b2f', eye: '#ffc247', outfit1: '#2b1630', outfit2: '#ffb23e'
    },
    look: { hairStyle: 'curls', bangs: 'curly', eyeStyle: 'warm', accessory: 'hoops', outfit: 'jacket' },
    voice: { label: 'Honeyed mezzo', pitch: 1.25, rate: 1.0, hints: ['Tessa', 'Google US English', 'Samantha'] },
    belly: { label: 'Golden hour gurgle', base: 84, pulse: 5.7, cutoff: 620, timbre: 'warm' },
    intro: 'Okay, okay, I am here! Traffic was a war crime. You waited? Good. You get a song.',
    winLine: 'You filled me up. Heart and stomach. I hope you like the acoustics in there.',
    lossLine: 'You lost the rhythm. And now you are the after-party snack.',
    struggleLines: [
      'Hehe— that is a funky little wiggle.',
      'Oh, you are dancing in there! I can feel the bass.',
      'Careful. My stomach has a very strict no-refunds policy.',
      'You are making waves. Literally. Do it again.',
      'That tickled my whole soul. And my lunch.'
    ],
    idleLines: [
      'This is the best after-party I have ever had.',
      'My heartbeat is the bassline. Can you hear it?',
      'You are so warm. Like the last hour of sunshine.',
      'I am not letting you leave until the song ends. It is a very long song.',
      'My plants are going to be so jealous.'
    ],
    leaveLine: 'You are leaving? Okay. But the encore is at eight.',
    scenes: [
      {
        prompt: 'Okay, I am here. Traffic was a war crime. You waited?',
        options: [
          { text: 'Of course I waited.', tone: 'good', reply: 'Of course. You say that so easily. I am swooning. This is a swoon.' },
          { text: 'I was about to leave.', tone: 'bad', reply: 'About to leave. Wow. Remind me to play a sad song later.' },
          { text: 'How bad was traffic?', tone: 'neutral', reply: 'Bad. But I survived. The bus did not.' },
          { text: 'What took you so long?', tone: 'neutral', reply: 'A series of increasingly bad decisions. The usual.' }
        ]
      },
      {
        prompt: 'I made this song about you. It is three seconds long. It is a heartbeat.',
        options: [
          { text: 'Play it for me.', tone: 'good', reply: 'Oh, you are going to make me blush. Okay. Listen close. Ba-dum. Ba-dum.' },
          { text: 'That is barely a song.', tone: 'bad', reply: 'Barely a song? It is a whole feeling. You are a whole feeling. Ugh.' },
          { text: 'What instruments did you use?', tone: 'neutral', reply: 'My heart. And a synth. Mostly the synth.' },
          { text: 'Three seconds is short.', tone: 'neutral', reply: 'Short and sweet. Like a good kiss. Not that I would know. Yet.' }
        ]
      },
      {
        prompt: 'Dance with me. The streetlights are the disco ball.',
        options: [
          { text: 'I do not dance.', tone: 'bad', reply: 'You do not dance. On a date with a DJ. I am calling the police.' },
          { text: 'Only if you lead.', tone: 'good', reply: 'Oh, I will lead. I will lead you right into my heart. Cheesy. I know.' },
          { text: 'There is no music.', tone: 'neutral', reply: 'The city is the music. Listen. That is a bus. Very avant-garde.' },
          { text: 'What kind of dance?', tone: 'neutral', reply: 'The kind where we both look silly and do not care.' }
        ]
      },
      {
        prompt: 'You have got main-character energy. I have main-character problems.',
        options: [
          { text: 'What problems?', tone: 'neutral', reply: 'Too many feelings. Not enough pockets. The usual.' },
          { text: 'I can help with the problems.', tone: 'good', reply: 'Careful. I might take you up on that. I am very good at needing people.' },
          { text: 'You are not the main character.', tone: 'bad', reply: 'Not the main character? In my own life? The audacity.' },
          { text: 'I prefer being a side character.', tone: 'neutral', reply: 'Side characters are the best. They get the good lines.' }
        ]
      },
      {
        prompt: 'I talk to plants. This one is named after you. He is thirsty.',
        options: [
          { text: 'Why is he named after me?', tone: 'neutral', reply: 'Because you are both tall and need attention. I am kidding. Mostly.' },
          { text: 'I am honored. Can I meet him?', tone: 'good', reply: 'You want to meet my plant? Okay, now I really like you. Do not tell the plant.' },
          { text: 'That is weird.', tone: 'bad', reply: 'Weird. My plant heard that. He is devastated.' },
          { text: 'What kind of plant is he?', tone: 'neutral', reply: 'A very dramatic fern. He faints when I forget to water him.' }
        ]
      },
      {
        prompt: 'If I invited you to my set, would you stay until the last song?',
        options: [
          { text: 'Only if the last song is good.', tone: 'bad', reply: 'Only if. Wow. I will dedicate it to you. It will be called "Ugh."' },
          { text: 'I would stay until the lights come up.', tone: 'good', reply: 'Until the lights come up. That is the most romantic thing. I need a minute.' },
          { text: 'What time does it end?', tone: 'neutral', reply: 'When the vibe says so. So. Late.' },
          { text: 'Do you play requests?', tone: 'neutral', reply: 'Yes. But I will judge them. Silently. Mostly silently.' }
        ]
      },
      {
        prompt: 'I am a terrible secret-keeper. Tell me something scandalous.',
        options: [
          { text: 'I do not have any secrets.', tone: 'bad', reply: 'No secrets. Boring. I am going to make one up about you.' },
          { text: 'I have never told anyone this, but I sing in the shower.', tone: 'good', reply: 'That is adorable. I am imagining it. Oh no. I am blushing.' },
          { text: 'What counts as scandalous?', tone: 'neutral', reply: 'Anything you would not want your mom to hear. Keep it interesting.' },
          { text: 'I am an open book.', tone: 'neutral', reply: 'Open books are nice. But I like a little mystery.' }
        ]
      },
      {
        prompt: 'The sun is going down. What is the move?',
        options: [
          { text: 'We stay right here.', tone: 'good', reply: 'Right here. With me. Okay. That is the move. That is the whole move.' },
          { text: 'I should get home.', tone: 'bad', reply: 'Home. Before the best part. Unbelievable.' },
          { text: 'What do you want to do?', tone: 'neutral', reply: 'You are asking the DJ to choose the song? Bold.' },
          { text: 'Let us get dinner.', tone: 'neutral', reply: 'Dinner. I could eat. I could eat a lot. Just saying.' }
        ]
      }
    ]
  },
  {
    id: 'rei',
    number: '07',
    name: 'Rei Kuro',
    handle: '@rei.afterdark',
    age: 22,
    archetype: 'Night Owl',
    tagline: 'Rooftop romantic. Sharp edges. Soft middle.',
    bio: 'Bedroom musician, part-time ghost, full-time softie in a leather jacket. Rei will pretend not to care, then remember your coffee order for a year.',
    quote: 'I hate crowds. I do not hate you. Yet.',
    palette: {
      accent: '#ff3b6b', accent2: '#ffb6c7', bg1: '#791744', bg2: '#0f0715',
      ink: '#08030b', hair: '#2b1a2e', hairShade: '#0b0710', hairLight: '#7a4d78',
      skin: '#f2ccbc', eye: '#ff315f', outfit1: '#141018', outfit2: '#d62950'
    },
    look: { hairStyle: 'wolf', bangs: 'spiky', eyeStyle: 'cat', accessory: 'choker', outfit: 'leather' },
    voice: { label: 'Smoky low', pitch: 0.9, rate: 0.93, hints: ['Karen', 'Moira', 'Samantha'] },
    belly: { label: 'Low midnight churn', base: 68, pulse: 4.2, cutoff: 430, timbre: 'dark' },
    intro: 'You came. I was not sure you would. Do not make it weird. It is already weird.',
    winLine: 'Full. You actually did it. Now I am never letting you go.',
    lossLine: 'You lost me. Now I get to keep you. That is the deal.',
    struggleLines: [
      'Hehe. You are so dramatic. It is cute.',
      'Stop squirming. Or do not. I am not your boss.',
      'That is a very small rebellion. I respect it.',
      'You are tickling my ribs. This is not the vibe.',
      'I said I was not clingy. I lied.'
    ],
    idleLines: [
      'It is quiet in here. I like quiet.',
      'You can stay. I am not going to say it twice.',
      'My stomach is a better venue than most clubs.',
      'I wrote a song about this. It is three chords and embarrassing.',
      'Do not tell anyone I am happy.'
    ],
    leaveLine: 'Leave if you want. I will be here. Being normal about it.',
    scenes: [
      {
        prompt: 'I brought you to a rooftop. The view is okay. You are tolerable.',
        options: [
          { text: 'Tolerable is high praise from you.', tone: 'good', reply: 'Do not let it go to your head. But yes. It is.' },
          { text: 'The view is better than okay.', tone: 'neutral', reply: 'It is fine. The city looks like a circuit board from here.' },
          { text: 'Why are we on a roof?', tone: 'neutral', reply: 'Because people are down there. That is the whole reason.' },
          { text: 'You could be nicer.', tone: 'bad', reply: 'Nicer. On a rooftop. At night. You want me to wear a bow too?' }
        ]
      },
      {
        prompt: 'Do not ask about the bandage. It is fashion.',
        options: [
          { text: 'Is it fashion, though?', tone: 'bad', reply: 'Yes. It is fashion. Do not test me.' },
          { text: 'It suits you.', tone: 'good', reply: 'It suits me. Huh. You are not completely useless.' },
          { text: 'Did you get hurt?', tone: 'neutral', reply: 'No. I said it is fashion. Why are you like this?' },
          { text: 'What happened to your hand?', tone: 'neutral', reply: 'You are really focused on the hand. Let it go.' }
        ]
      },
      {
        prompt: 'I hate crowds. But I do not hate you. Yet.',
        options: [
          { text: 'Yet? That is ominous.', tone: 'good', reply: 'It is a warning. And a compliment. Mostly a compliment.' },
          { text: 'Thanks. I think.', tone: 'neutral', reply: 'You are welcome. I think. This is going well.' },
          { text: 'Why do you hate crowds?', tone: 'neutral', reply: 'Too many people. Too much noise. Too much everything.' },
          { text: 'You should get over it.', tone: 'bad', reply: 'Get over it. Wow. I will add that to my list of things to do never.' }
        ]
      },
      {
        prompt: 'You are not scared of me?',
        options: [
          { text: 'Should I be?', tone: 'good', reply: 'Maybe. But I am glad you are not. It gets lonely being scary.' },
          { text: 'You are not scary.', tone: 'bad', reply: 'Not scary. There goes my whole brand.' },
          { text: 'Why would I be scared?', tone: 'neutral', reply: 'The jacket. The face. The vibe. Pick one.' },
          { text: 'A little.', tone: 'neutral', reply: 'A little is healthy. I will take it.' }
        ]
      },
      {
        prompt: 'I write sad songs. They are actually very upbeat. It is complicated.',
        options: [
          { text: 'That makes no sense.', tone: 'bad', reply: 'It makes sense if you have feelings. Which you might not.' },
          { text: 'I want to hear one.', tone: 'good', reply: 'You want to hear one. Okay. Do not laugh. I will know.' },
          { text: 'What do you play?', tone: 'neutral', reply: 'Guitar. Badly. But with feeling.' },
          { text: 'Why are they upbeat?', tone: 'neutral', reply: 'Because being sad is not the whole story. That is the point.' }
        ]
      },
      {
        prompt: 'If I disappeared, would you look for me?',
        options: [
          { text: 'Where would you go?', tone: 'neutral', reply: 'Somewhere quiet. You would not find me. That is the point.' },
          { text: 'I would not stop looking.', tone: 'good', reply: 'You would not stop. That is... a lot. I am going to need a minute.' },
          { text: 'Probably.', tone: 'bad', reply: 'Probably. I will remember that at my next existential crisis.' },
          { text: 'That is a weird question.', tone: 'neutral', reply: 'I am a weird person. Keep up.' }
        ]
      },
      {
        prompt: 'I do not do cute. But I make exceptions.',
        options: [
          { text: 'Am I an exception?', tone: 'good', reply: 'Maybe. Do not make me say it out loud. The roof has ears.' },
          { text: 'You are a little cute.', tone: 'bad', reply: 'A little. I am going to push you off this roof. Gently.' },
          { text: 'What counts as cute?', tone: 'neutral', reply: 'Small animals. Old couples. You. That is the list.' },
          { text: 'I am not cute either.', tone: 'neutral', reply: 'Sure. We can both be terrifying. Very normal date.' }
        ]
      },
      {
        prompt: 'I am hungry. And you are looking like a whole snack.',
        options: [
          { text: 'That is a line.', tone: 'neutral', reply: 'It is a line. A good line. You are blushing.' },
          { text: 'Careful. I might take that literally.', tone: 'good', reply: 'Oh, you are flirting with danger. I like danger. Stay close.' },
          { text: 'That is creepy.', tone: 'bad', reply: 'Creepy. I was going for mysterious. Thanks a lot.' },
          { text: 'What do you want to eat?', tone: 'neutral', reply: 'Something warm. Preferably with a heartbeat.' }
        ]
      }
    ]
  },
  {
    id: 'hana',
    number: '08',
    name: 'Hana Mori',
    handle: '@hana.grows',
    age: 23,
    archetype: 'Greenhouse Girl',
    tagline: 'Soft rain, warm soup, and roots that hold.',
    bio: 'Botany nerd, soup enthusiast, and the calmest person in any crisis. Hana remembers the names of your childhood pets and probably has a plant named after them.',
    quote: 'I brought you a flower. It is a dandelion. It is a weed. But it is brave.',
    palette: {
      accent: '#8dde84', accent2: '#e4ffd8', bg1: '#b8e8a8', bg2: '#2a5137',
      ink: '#17301e', hair: '#ffc49b', hairShade: '#c67b5b', hairLight: '#ffe0c5',
      skin: '#f6d6be', eye: '#9b7a43', outfit1: '#f8f4df', outfit2: '#8dde84'
    },
    look: { hairStyle: 'wavy', bangs: 'curtain', eyeStyle: 'soft', accessory: 'flowers', outfit: 'sundress' },
    voice: { label: 'Meadow soft', pitch: 1.3, rate: 0.95, hints: ['Samantha', 'Google US English', 'Microsoft Zira'] },
    belly: { label: 'Mossy little gurgle', base: 64, pulse: 4.8, cutoff: 470, timbre: 'soft' },
    intro: 'Oh, hi. I brought you a flower. It is a dandelion. It is technically a weed, but I think it is brave.',
    winLine: 'Your heart is full. Mine too. And I think my stomach just made room.',
    lossLine: 'Oh. You lost all your hearts. I guess you will have to grow somewhere else now.',
    struggleLines: [
      'Hehe— careful, I am ticklish.',
      'You are wiggling like a little seedling.',
      'Oh! That was a strong one. I am impressed.',
      'Shh. You are safe. Just very, very cozy.',
      'Do not worry. I am a very good host.'
    ],
    idleLines: [
      'The rain sounds nice from in here.',
      'I could stay like this forever. I think you could too.',
      'My stomach is warm. Like fresh bread.',
      'I am going to remember this. Every detail.',
      'You are my favorite thing I have ever grown.'
    ],
    leaveLine: 'You can leave. I will miss you quietly, like a plant.',
    scenes: [
      {
        prompt: 'I brought you a flower. It is a dandelion. It is a weed. But it is brave.',
        options: [
          { text: 'It is beautiful.', tone: 'good', reply: 'You think so? Most people just see a weed. I see a survivor.' },
          { text: 'It is just a weed.', tone: 'bad', reply: 'Just a weed. The dandelion heard that. It is devastated.' },
          { text: 'Why a dandelion?', tone: 'neutral', reply: 'Because they grow anywhere. Even concrete. I respect that.' },
          { text: 'Where did you get it?', tone: 'neutral', reply: 'By the bus stop. Do not tell the city.' }
        ]
      },
      {
        prompt: 'I talk to my seedlings. They do not talk back. It is healthy.',
        options: [
          { text: 'That is sweet.', tone: 'good', reply: 'You think so? I was worried it was a red flag. It is nice to be seen.' },
          { text: 'That is weird.', tone: 'bad', reply: 'Weird. From the person who does not eat vegetables, probably.' },
          { text: 'What do you say to them?', tone: 'neutral', reply: 'Mostly encouragement. Sometimes gossip. They are good listeners.' },
          { text: 'Do they grow better?', tone: 'neutral', reply: 'I like to think so. Or maybe they are just polite.' }
        ]
      },
      {
        prompt: 'I made way too much soup. Do you want to come over?',
        options: [
          { text: 'I would love that.', tone: 'good', reply: 'Really? Okay. I will pretend I did not make enough for four people on purpose.' },
          { text: 'What kind of soup?', tone: 'neutral', reply: 'Pumpkin. With a secret ingredient. It is nutmeg. The secret is out.' },
          { text: 'I am busy.', tone: 'bad', reply: 'Busy. Okay. I will put it in the freezer. For when you are less busy.' },
          { text: 'How much soup is too much?', tone: 'neutral', reply: 'There is no such thing. Only soup that has not met the right person.' }
        ]
      },
      {
        prompt: 'Do you think I am too quiet?',
        options: [
          { text: 'Not at all. I like quiet.', tone: 'good', reply: 'You do? That is a relief. I always worry I am boring people.' },
          { text: 'A little.', tone: 'bad', reply: 'A little. I will try to be louder. This is me being louder. Hello.' },
          { text: 'Why do you ask?', tone: 'neutral', reply: 'People usually fill the silence. I just let it grow.' },
          { text: 'Quiet is fine.', tone: 'neutral', reply: 'Good. I have a lot of it.' }
        ]
      },
      {
        prompt: 'I like rainy days. Everything gets to slow down.',
        options: [
          { text: 'Rain is depressing.', tone: 'bad', reply: 'Depressing. I will remember that when the clouds come to visit.' },
          { text: 'Slow days are my favorite.', tone: 'good', reply: 'Mine too. We can be slow together. That sounds perfect.' },
          { text: 'Do you go outside in the rain?', tone: 'neutral', reply: 'Sometimes. I like the smell of wet concrete. Is that weird?' },
          { text: 'What do you do on rainy days?', tone: 'neutral', reply: 'Read. Drink tea. Talk to plants. The usual.' }
        ]
      },
      {
        prompt: 'I named this plant after my grandma. She is doing great.',
        options: [
          { text: 'Which plant?', tone: 'neutral', reply: 'The big one by the window. She is very dramatic in the morning.' },
          { text: 'That is really lovely.', tone: 'good', reply: 'It is. I talk to her every day. She is a better listener than most people.' },
          { text: 'Is your grandma a plant?', tone: 'bad', reply: 'No. My grandma is a person. The plant is named after her. Oh my god.' },
          { text: 'What kind of plant is it?', tone: 'neutral', reply: 'A monstera. She is taking over the apartment. Very on brand.' }
        ]
      },
      {
        prompt: 'You are staring. Do I have dirt on my face?',
        options: [
          { text: 'No. I just like looking at you.', tone: 'good', reply: 'Oh. Oh. I am going to dig a hole and plant myself in it.' },
          { text: 'Yes. Right there.', tone: 'bad', reply: 'Where? Do not tell me. I will not recover.' },
          { text: 'What were you doing before this?', tone: 'neutral', reply: 'Repotting. My hands smell like soil. I hope that is okay.' },
          { text: 'I was not staring.', tone: 'neutral', reply: 'You were. But I will let you deny it.' }
        ]
      },
      {
        prompt: 'I am not very good at dating. But I am good at staying.',
        options: [
          { text: 'Staying is the important part.', tone: 'good', reply: 'I think so too. Everyone leaves so fast. I do not want to.' },
          { text: 'We will see.', tone: 'bad', reply: 'We will see. Very noncommittal. I will put that in my compost.' },
          { text: 'What makes you bad at dating?', tone: 'neutral', reply: 'I talk about plants too much. And soup. And soil.' },
          { text: 'Do you want to stay?', tone: 'neutral', reply: 'I do. But I also want to grow. Both is good.' }
        ]
      }
    ]
  },
  {
    id: 'emi',
    number: '09',
    name: 'Emi Nova',
    handle: '@emi.nyaa',
    age: 21,
    archetype: 'Cosmic Cat',
    tagline: 'Certified alien. Part-time cat. Full-time chaos.',
    bio: 'Cat-ear headset collector, rhythm game menace, and self-diagnosed space entity. Emi has three personalities and all of them think you are cute.',
    quote: 'Nya. That is all I have prepared. Please rate my opening line.',
    palette: {
      accent: '#d47cff', accent2: '#f1d5ff', bg1: '#c57bff', bg2: '#28104d',
      ink: '#1c0d2e', hair: '#e9e8ff', hairShade: '#9894c9', hairLight: '#ffffff',
      skin: '#f6d8cd', eye: '#cd70ff', outfit1: '#211835', outfit2: '#d47cff'
    },
    look: { hairStyle: 'spacebuns', bangs: 'straight', eyeStyle: 'galaxy', accessory: 'cat', outfit: 'hoodie' },
    voice: { label: 'Star-bright soprano', pitch: 1.7, rate: 1.15, hints: ['Google US English', 'Samantha', 'Microsoft Zira'] },
    belly: { label: 'Cosmic cat burble', base: 100, pulse: 6.8, cutoff: 830, timbre: 'digital' },
    intro: 'Nya. That is all I have prepared. Please rate my opening line. Be honest. No, do not be honest.',
    winLine: 'Heart meter full! That means you are mine now. And my stomach is the venue.',
    lossLine: 'Love meter empty. Initiating snack protocol. Sorry, I do not make the rules.',
    struggleLines: [
      'Nyahaha! That tickles my whole entire soul.',
      'You are wiggling like a little alien. I am into it.',
      'Stop. I am laughing too hard to be menacing.',
      'Oh! That was a good one. Do it again. I dare you.',
      'This is my stomach. I am the captain now.'
    ],
    idleLines: [
      'My stomach is purring. Is that weird? It is probably fine.',
      'I could stay here forever. The rent is free.',
      'I am charging your phone with my body heat. You are welcome.',
      'This is my favorite level. The secret belly level.',
      'Do you think aliens have belly buttons? I do not. Wait.'
    ],
    leaveLine: 'You are leaving? Okay. I will be here. Being a cat. Normally.',
    scenes: [
      {
        prompt: 'Nya. That is all I have prepared. Please rate my opening line.',
        options: [
          { text: 'Ten out of ten. Flawless.', tone: 'good', reply: 'Ten! I am framing this. I am putting it on my wall.' },
          { text: 'I am not really a cat person.', tone: 'bad', reply: 'Not a cat person. Okay. I am leaving. I am not leaving. But I am hurt.' },
          { text: 'What else did you prepare?', tone: 'neutral', reply: 'Nothing. That was the whole plan. I am improvising now.' },
          { text: 'Is nya a word?', tone: 'neutral', reply: 'It is a lifestyle. A language. A business model.' }
        ]
      },
      {
        prompt: 'I am a cat. I am also a gamer. And a girl. It is a lot.',
        options: [
          { text: 'That is a lot.', tone: 'neutral', reply: 'It is. I am juggling. Do not distract me.' },
          { text: 'I like all three.', tone: 'good', reply: 'All three. Oh no. You are going to be a problem. A cute problem.' },
          { text: 'You are not a cat.', tone: 'bad', reply: 'Not a cat. Tell that to my ears. Tell that to my tail. I do not have a tail.' },
          { text: 'Which one is your favorite?', tone: 'neutral', reply: 'I cannot choose. They are all me. It is a package deal.' }
        ]
      },
      {
        prompt: 'I knocked a glass off the table today. It felt right.',
        options: [
          { text: 'Why would you do that?', tone: 'bad', reply: 'Because I am a cat. Next question. Actually, do not ask another one.' },
          { text: 'Understandable. Gravity needed testing.', tone: 'good', reply: 'Exactly! You understand science. You understand me. Marry me. Too fast? Too fast.' },
          { text: 'Did it break?', tone: 'neutral', reply: 'Yes. Very satisfying. I am not proud. I am a little proud.' },
          { text: 'What kind of glass?', tone: 'neutral', reply: 'A water glass. It was looking at me funny.' }
        ]
      },
      {
        prompt: 'Would you feed me? Not like that. Maybe like that.',
        options: [
          { text: 'What do you want?', tone: 'neutral', reply: 'Something crunchy. Something warm. Something with a heartbeat. Kidding.' },
          { text: 'I will feed you. And you can feed on me later.', tone: 'good', reply: 'Oh! Bold. I like bold. I am going to pretend I did not blush.' },
          { text: 'That is weird.', tone: 'bad', reply: 'Weird. This from the person who showed up on time. So weird.' },
          { text: 'Do you like tuna?', tone: 'neutral', reply: 'I am not that kind of cat. But yes. Obviously.' }
        ]
      },
      {
        prompt: 'I have three personalities. You have met two.',
        options: [
          { text: 'Which one am I meeting now?', tone: 'good', reply: 'The one that likes you. They all like you, but this one is the most normal about it.' },
          { text: 'That sounds exhausting.', tone: 'bad', reply: 'Exhausting? It is a rich inner life. You would not get it.' },
          { text: 'What is the third one?', tone: 'neutral', reply: 'The third one only comes out at 3 a.m. You are not ready.' },
          { text: 'Do they all have names?', tone: 'neutral', reply: 'Yes. Emi, Emi, and Emi. I am very creative.' }
        ]
      },
      {
        prompt: 'Do you believe in aliens? I know one.',
        options: [
          { text: 'Is it you?', tone: 'good', reply: 'You figured it out. I am an alien. Do not tell anyone. Or do. It is fine.' },
          { text: 'No.', tone: 'bad', reply: 'No. Just no. The universe is huge and you are being closed-minded.' },
          { text: 'What do they look like?', tone: 'neutral', reply: 'Cute. Small. Glowing. Kind of like me. Suspiciously like me.' },
          { text: 'Have they visited Earth?', tone: 'neutral', reply: 'I mean. I am here. So. Yes.' }
        ]
      },
      {
        prompt: 'I am sleepy. Carry me. I am joking. Am I?',
        options: [
          { text: 'Come here.', tone: 'good', reply: 'Oh. Okay. You are actually doing it. This is the best day of my life.' },
          { text: 'You are too heavy.', tone: 'bad', reply: 'Too heavy. I am a star. Stars are heavy. Rude.' },
          { text: 'Why are you sleepy?', tone: 'neutral', reply: 'I have been awake for 19 hours. Gaming. Do not judge me.' },
          { text: 'I am not carrying you.', tone: 'neutral', reply: 'Fine. I will carry myself. This time.' }
        ]
      },
      {
        prompt: 'This date has a 100% chance of going well. I did the math.',
        options: [
          { text: 'Your math is wrong.', tone: 'bad', reply: 'Wrong? I am a cat alien. Math is optional for me.' },
          { text: 'I like those odds.', tone: 'good', reply: 'You should. The odds like you too. This is going great. Do not jinx it.' },
          { text: 'How did you calculate that?', tone: 'neutral', reply: 'I did not. I vibed. It is the same thing.' },
          { text: 'What if it goes badly?', tone: 'neutral', reply: 'Then I eat you. That was the plan either way. Kidding. Mostly.' }
        ]
      }
    ]
  },
  {
    id: 'kira',
    number: '10',
    name: 'Kira Blaze',
    handle: '@kira.clutch',
    age: 24,
    archetype: 'Boss Rush',
    tagline: 'Confident, loud, and absolutely not letting you go.',
    bio: 'Variety streamer, former esports almost-star, and a walking victory lap. Kira decided she liked you before you sat down and sees no reason to change her mind.',
    quote: 'I do not lose. Not games. Not arguments. Not hearts.',
    palette: {
      accent: '#ffd23f', accent2: '#fff0ad', bg1: '#ffbb35', bg2: '#4e260c',
      ink: '#2d1605', hair: '#ffd35a', hairShade: '#c8861f', hairLight: '#fff0a6',
      skin: '#f0c19e', eye: '#d99315', outfit1: '#191318', outfit2: '#ffcf3f'
    },
    look: { hairStyle: 'highpony', bangs: 'side', eyeStyle: 'fierce', accessory: 'shades', outfit: 'varsity' },
    voice: { label: 'Bright champion', pitch: 1.18, rate: 1.06, hints: ['Microsoft Zira', 'Samantha', 'Google US English'] },
    belly: { label: 'Victory-lap rumble', base: 80, pulse: 5.4, cutoff: 590, timbre: 'punchy' },
    intro: 'I already decided I like you. Convince me I am wrong. You have one date.',
    winLine: 'Full meter. Victory. You are the prize, and I am taking you home.',
    lossLine: 'Zero hearts. You lose. Winner takes the snack.',
    struggleLines: [
      'Hehe— a rematch? In there? Bold.',
      'You are wiggling. I am winning. This is normal.',
      'Oh, you are a sore loser. It is adorable.',
      'Struggle all you want. I am still undefeated.',
      'That tickles. I am going to call it strategy.'
    ],
    idleLines: [
      'Victory tastes like you. That sounded weird. I am keeping it.',
      'This is the best trophy I have ever won.',
      'My heart is still racing. Yours is too. I can feel it.',
      'I could get used to this. I will get used to this.',
      'Chat is going to be so jealous.'
    ],
    leaveLine: 'You are leaving. I am not losing. I am just letting you think you won.',
    scenes: [
      {
        prompt: 'I already decided I like you. Convince me I am wrong.',
        options: [
          { text: 'You are not wrong.', tone: 'good', reply: 'Correct. That was the only acceptable answer. Welcome to the team.' },
          { text: 'You do not even know me.', tone: 'bad', reply: 'I know enough. And I am never wrong. Except sometimes. Not now.' },
          { text: 'How do I do that?', tone: 'neutral', reply: 'You do not. It is a trap. I already won.' },
          { text: 'What do you like about me?', tone: 'neutral', reply: 'The confidence. The mystery. The way you ask questions.' }
        ]
      },
      {
        prompt: 'I stream to 400 people and yet you are the only one looking at me.',
        options: [
          { text: 'They are missing out.', tone: 'good', reply: 'They are. But I am glad. This view is mine.' },
          { text: 'I am not looking at you.', tone: 'bad', reply: 'Not looking. Sure. Your eyes are literally doing it right now.' },
          { text: 'What do you stream?', tone: 'neutral', reply: 'Games. Rage. Occasional cooking. Mostly rage.' },
          { text: 'Four hundred is a lot.', tone: 'neutral', reply: 'It is. But it is not the number I care about right now.' }
        ]
      },
      {
        prompt: 'I do not lose. Not games. Not arguments. Not hearts.',
        options: [
          { text: 'Everyone loses eventually.', tone: 'bad', reply: 'Everyone except me. And now you. We are a team.' },
          { text: 'Then I guess I am playing to win.', tone: 'good', reply: 'Oh, I like that. A challenge. You are going to lose, but I respect it.' },
          { text: 'What is your win rate?', tone: 'neutral', reply: 'One hundred percent. The losses do not count.' },
          { text: 'That sounds lonely.', tone: 'neutral', reply: 'Lonely? I have a whole chat. And now you. Not lonely.' }
        ]
      },
      {
        prompt: 'You are nervous. Cute. Keep it.',
        options: [
          { text: 'I am not nervous.', tone: 'bad', reply: 'You are. Your voice did a little thing. I noticed. I notice everything.' },
          { text: 'You make me nervous.', tone: 'good', reply: 'Good. That means I am winning. Keep making that face.' },
          { text: 'How can you tell?', tone: 'neutral', reply: 'I have eyes. And a very competitive amount of intuition.' },
          { text: 'Is that a compliment?', tone: 'neutral', reply: 'Yes. Obviously. Keep up, rookie.' }
        ]
      },
      {
        prompt: 'If I win this round, you owe me a kiss. If I lose, I owe you one.',
        options: [
          { text: 'That is not fair.', tone: 'bad', reply: 'Fair is for people who are not me. Take the deal.' },
          { text: 'Deal. But I am playing to win.', tone: 'good', reply: 'Oh, we are going to have fun. I am going to destroy you. Affectionately.' },
          { text: 'What game?', tone: 'neutral', reply: 'Something I am good at. So. Any game.' },
          { text: 'I do not kiss on the first date.', tone: 'neutral', reply: 'Good. I respect boundaries. I will win it on the second.' }
        ]
      },
      {
        prompt: 'My chat wants to know if you are single. I said not for long.',
        options: [
          { text: 'You cannot just decide that.', tone: 'bad', reply: 'I can. I did. The chat is very supportive.' },
          { text: 'Tell them I am taken.', tone: 'good', reply: 'Taken. By me. Officially. This is a great day for the brand.' },
          { text: 'What did they say?', tone: 'neutral', reply: 'They are spamming hearts. It is very embarrassing. For them.' },
          { text: 'I am single.', tone: 'neutral', reply: 'Not for long. I already said that. Keep up.' }
        ]
      },
      {
        prompt: 'I am a sore winner. It is part of my charm.',
        options: [
          { text: 'It is not charming.', tone: 'bad', reply: 'Not charming. Wow. I am going to win extra hard now.' },
          { text: 'I can live with that.', tone: 'good', reply: 'Good. You are going to have to. I am insufferable. It is my best quality.' },
          { text: 'What do you win at?', tone: 'neutral', reply: 'Everything. Arguments. Games. Being right. It is a gift.' },
          { text: 'Do you ever let anyone else win?', tone: 'neutral', reply: 'Sometimes. When I feel generous. It is rare.' }
        ]
      },
      {
        prompt: 'I am hungry. But I am always hungry. Ignore that.',
        options: [
          { text: 'Should I be worried?', tone: 'good', reply: 'Worried? No. Flattered? Maybe. You are looking pretty edible. Kidding. Maybe.' },
          { text: 'Let us get food.', tone: 'neutral', reply: 'Finally, someone with a plan. I was starting to think you were the snack.' },
          { text: 'You are always hungry?', tone: 'neutral', reply: 'Always. It is a medical condition called being iconic.' },
          { text: 'That is concerning.', tone: 'bad', reply: 'Concerning. I am a growing girl. With a growing appetite. Rude.' }
        ]
      }
    ]
  }
];

export const gameConfig = {
  startingLove: 50,
  goodGain: 11,
  badLoss: 13,
  winAt: 100,
  loseAt: 0
};

export const loveStages = [
  { min: 0, label: 'RUN.', hint: 'She is one bad answer away.' },
  { min: 18, label: 'Uneasy', hint: 'Keep your voice steady.' },
  { min: 36, label: 'Curious', hint: 'She is still deciding.' },
  { min: 54, label: 'Flirty', hint: 'You are doing something right.' },
  { min: 72, label: 'Smitten', hint: 'Her heart is racing.' },
  { min: 89, label: 'Feral', hint: 'Do not blow this.' },
  { min: 100, label: 'Devoured', hint: 'There is no going back.' }
];

export function stageFor(love) {
  let stage = loveStages[0];
  for (const item of loveStages) if (love >= item.min) stage = item;
  return stage;
}

export function characterById(id) {
  return characters.find((character) => character.id === id);
}
