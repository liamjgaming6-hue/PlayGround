/* ------------------------------------------------------------------
   CRAVE — character and dialogue data
   Every character is an adult (21+). Soft-vore / dark romantic comedy.
------------------------------------------------------------------- */

export const TONES = {
  good: { label: 'right', amount: 14 },
  neutral: { label: 'neutral', amount: 0 },
  bad: { label: 'wrong', amount: -15 }
};

export const CHARACTERS = [
  {
    id: 'mina',
    number: '01',
    name: 'Mina Park',
    age: 21,
    handle: '@minamochi',
    tag: 'The Sweet Streamer',
    accent: '#ff7eb6',
    accent2: '#7ee7ff',
    danger: 'will stream your first date',
    blurb: 'Sunshine with a ring light. Says “one more stream” like it is a promise.',
    petName: 'cutie',
    art: {
      skin: '#f4cdb9', skinShade: '#e6ad9c', blush: '#ef8ba3',
      hair: '#ef83b2', hairDark: '#c14f81', eye: '#74468a',
      bg1: '#ffd8e8', bg2: '#f3a6c8', outfit: '#f7efe8', outfitDark: '#d9c5c7',
      style: 'twin', bangs: 'wispy', accessory: 'hearts', outfitStyle: 'hoodie',
      eyeStyle: 'round', expression: 'beam'
    },
    reactions: {
      good: [
        'Her ears go pink. “Okay. That was smooth. I hate that it worked.”',
        '“Chat is never hearing about this,” she says, already reaching for her phone.',
        'She bites her lip, trying very hard to look unbothered. “Keep talking.”'
      ],
      neutral: [
        '“Hm. Fair.” She stirs her drink and waits for something with more teeth.',
        '“You’re really going to make me carry this conversation, huh?”',
        'She nods, filing that away. “Noted. Anyway…”'
      ],
      bad: [
        'The streamer smile clicks back into place. “Wow. Okay. Clip that.”',
        '“Oof.” She winces. “Chat would cook you for that one.”',
        'Her face falls for half a second before she laughs it off. “Yikes.”'
      ]
    },
    winQuote: 'You fit so perfectly here. Stay a while. I’m not done being selfish.',
    leaveQuote: 'Fine. But you’re coming back. I can tell.',
    deathQuote: 'You were sweet. I’m sorry. I’m not, really.',
    giggles: [
      'hehe— okay, that tickles.',
      'mmph. stop squirming, cutie.',
      'oh my god, you’re like a little popcorn kernel.',
      'another one? you’re going to make me blush.',
      'shh. I can feel you giggling in there.'
    ],
    lines: [
      {
        text: 'Okay, be honest. Did you lurk in my chat for, like, three weeks before saying hi?',
        options: [
          { text: 'I wanted my first message to be worth the wait.', tone: 'good' },
          { text: 'What’s your posting schedule like?', tone: 'neutral' },
          { text: 'Yeah. I was bored.', tone: 'bad' },
          { text: 'You talk a lot. I had to brace myself.', tone: 'bad' }
        ]
      },
      {
        text: 'Chat says I should ask if you’re a serial killer. I told them you’re too cute for that.',
        options: [
          { text: 'Only a little dangerous. Mostly harmless to you.', tone: 'good' },
          { text: 'Do serial killers usually fill out their profiles?', tone: 'neutral' },
          { text: 'Why? Are you looking for a co-host?', tone: 'bad' },
          { text: 'Cute? I’ve been told I look tired.', tone: 'bad' }
        ]
      },
      {
        text: 'I’m kind of a lot. Like, I’ll text you every thought I have. Is that going to scare you off?',
        options: [
          { text: 'Send every thought. I want the whole patch notes.', tone: 'good' },
          { text: 'How many thoughts are we talking, roughly?', tone: 'neutral' },
          { text: 'Yeah, that would get annoying.', tone: 'bad' },
          { text: 'I don’t really text.', tone: 'bad' }
        ]
      },
      {
        text: 'My last date said I was “too online.” Rude, right?',
        options: [
          { text: 'You’re online because you’re interesting. He was just logged off.', tone: 'good' },
          { text: 'How many hours a day are we talking?', tone: 'neutral' },
          { text: 'He might have had a point.', tone: 'bad' },
          { text: 'At least you have a personality. Some people don’t.', tone: 'bad' }
        ]
      },
      {
        text: 'If I asked you to stay on call with me while I fall asleep, would that be weird?',
        options: [
          { text: 'Not weird. I’d take the first watch.', tone: 'good' },
          { text: 'What time do you usually fall asleep?', tone: 'neutral' },
          { text: 'Yeah, a little clingy.', tone: 'bad' },
          { text: 'I’m not really a phone person.', tone: 'bad' }
        ]
      },
      {
        text: 'You know I get a little… possessive when I like someone? Like, I want all their attention.',
        options: [
          { text: 'Good. I wasn’t planning on giving it to anyone else.', tone: 'good' },
          { text: 'How do you feel about shared calendars?', tone: 'neutral' },
          { text: 'That’s a red flag, honestly.', tone: 'bad' },
          { text: 'I need my space. A lot of it.', tone: 'bad' }
        ]
      },
      {
        text: 'This is going well. Suspiciously well. Are you a bot?',
        options: [
          { text: 'Beep boop. I’m programmed to think you’re perfect.', tone: 'good' },
          { text: 'What makes you think it’s going well?', tone: 'neutral' },
          { text: 'No, I’m just being nice.', tone: 'bad' },
          { text: 'Why would I be a bot?', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'luna',
    number: '02',
    name: 'Luna Vex',
    age: 22,
    handle: '@lunavex',
    tag: 'The Midnight Gamer',
    accent: '#a08cff',
    accent2: '#71e8d2',
    danger: 'will pause the game to stare at you',
    blurb: 'Perpetual eye bags, perfect aim. Has opinions about your loadout.',
    petName: 'player two',
    art: {
      skin: '#efc7b8', skinShade: '#dda998', blush: '#dc8e9e',
      hair: '#5d4b8b', hairDark: '#392b60', eye: '#74d8c8',
      bg1: '#ddd4ff', bg2: '#a99bf0', outfit: '#29233f', outfitDark: '#171329',
      style: 'long', bangs: 'side', accessory: 'headphones', outfitStyle: 'hoodie',
      eyeStyle: 'soft', expression: 'smirk'
    },
    reactions: {
      good: [
        'Her gaze flicks up from the table. “Careful. I might actually believe you.”',
        '“That’s— yeah. Okay.” She hides a smile behind her sleeve.',
        'She bumps your foot under the table. “You’re getting a save file.”'
      ],
      neutral: [
        '“Mm.” She picks at the label on her drink. “Bold strategy.”',
        'She gives a slow nod. “Noted.”',
        '“Anyway,” she says, already half-distracted by a notification.'
      ],
      bad: [
        'Her face closes like a game menu. “Right. Sure.”',
        '“Wow.” She leans back. “Critical hit.”',
        'She exhales through her nose. “I’m going to pretend you didn’t say that.”'
      ]
    },
    winQuote: 'You’re warm. Like a save point I don’t want to leave. Just… stay.',
    leaveQuote: 'Go on. I’ll be here. I’m always up late.',
    deathQuote: 'Game over. I’d restart you if I could.',
    giggles: [
      'heh— you’re kicking. I can feel it.',
      'mm. keep wriggling, player two.',
      'oh no. that’s— okay, that’s cute.',
      'you’re trying so hard. it’s adorable.',
      'shh. I’m trying to concentrate on not laughing.'
    ],
    lines: [
      {
        text: 'You actually came. I had a whole escape plan ready. It involved the fire exit and pretending I got a phone call.',
        options: [
          { text: 'Stay. I promise I’m better than the fire exit.', tone: 'good' },
          { text: 'What’s the fire exit code?', tone: 'neutral' },
          { text: 'I can leave if you want.', tone: 'bad' },
          { text: 'That’s a weird thing to say on a date.', tone: 'bad' }
        ]
      },
      {
        text: 'I’ve been up since 4 A.M. beating a boss. I look like a raccoon. Tell me the truth.',
        options: [
          { text: 'You look like the only person I want to lose sleep with.', tone: 'good' },
          { text: 'Which boss?', tone: 'neutral' },
          { text: 'You do look pretty rough.', tone: 'bad' },
          { text: 'Maybe try sleeping instead of gaming.', tone: 'bad' }
        ]
      },
      {
        text: 'I’m not great at… this. Talking. Eye contact. The whole thing.',
        options: [
          { text: 'Then let’s just exist. We don’t have to perform.', tone: 'good' },
          { text: 'Do you prefer texting?', tone: 'neutral' },
          { text: 'You’re doing fine. It’s not that hard.', tone: 'bad' },
          { text: 'Yeah, I noticed.', tone: 'bad' }
        ]
      },
      {
        text: 'If I invited you to co-op, would you actually play, or just watch me carry you?',
        options: [
          { text: 'I’d play support. You’re the main character.', tone: 'good' },
          { text: 'What game?', tone: 'neutral' },
          { text: 'I’d probably let you carry me.', tone: 'bad' },
          { text: 'I don’t really play games.', tone: 'bad' }
        ]
      },
      {
        text: 'I turned off my stream for this. My chat is probably writing fanfic about us right now.',
        options: [
          { text: 'Let them. I’d read it.', tone: 'good' },
          { text: 'How many viewers do you usually have?', tone: 'neutral' },
          { text: 'You should probably get back to them.', tone: 'bad' },
          { text: 'That’s a bit much.', tone: 'bad' }
        ]
      },
      {
        text: 'Can I ask you something dumb? Do you think I’m… too quiet?',
        options: [
          { text: 'I like quiet. It means I get to hear you think.', tone: 'good' },
          { text: 'Quiet is fine.', tone: 'neutral' },
          { text: 'Sometimes, yeah.', tone: 'bad' },
          { text: 'You’re not quiet. You’re weird.', tone: 'bad' }
        ]
      },
      {
        text: 'I have a spare controller. It’s pink. It’s for Player Two. Hypothetically.',
        options: [
          { text: 'Hypothetically, I’m already sitting closer.', tone: 'good' },
          { text: 'What console is it?', tone: 'neutral' },
          { text: 'I’d rather watch.', tone: 'bad' },
          { text: 'Pink’s not my color.', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'scarlet',
    number: '03',
    name: 'Scarlett Rey',
    age: 23,
    handle: '@scarlettrey',
    tag: 'The Neon Dancer',
    accent: '#ff6b61',
    accent2: '#ffc14d',
    danger: 'will make you jealous on purpose',
    blurb: 'Red lipstick, sharper smile. Dances like the room owes her money.',
    petName: 'trouble',
    art: {
      skin: '#e7b496', skinShade: '#d09677', blush: '#e07a72',
      hair: '#cf343e', hairDark: '#921d2b', eye: '#e0a63d',
      bg1: '#ffc3b2', bg2: '#ff8e7d', outfit: '#19131e', outfitDark: '#0a070d',
      style: 'bob', bangs: 'side', accessory: 'hoops', outfitStyle: 'dress',
      eyeStyle: 'sharp', expression: 'smirk'
    },
    reactions: {
      good: [
        'A slow, dangerous smile. “There it is. I was wondering when you’d bite back.”',
        'She taps her nail against her glass. “Careful. I might actually like you.”',
        '“Mm.” Her eyes drop to your mouth, then back up. “Good answer.”'
      ],
      neutral: [
        '“Boring,” she teases, but she’s still smiling.',
        'She shrugs one bare shoulder. “If that’s the best you’ve got.”',
        '“Noted.” The word lands like a coin on a table.'
      ],
      bad: [
        'Her smile sharpens into something less kind. “Ouch. And here I dressed up.”',
        '“Wow.” She laughs, once. “You’re lucky I like a little blood.”',
        'She turns her glass a quarter turn. “Try again, sweetheart.”'
      ]
    },
    winQuote: 'Look at you. All mine, right where I can feel every little heartbeat.',
    leaveQuote: 'Run along. But don’t think I won’t notice when you come back.',
    deathQuote: 'Poor thing. You should have kept up.',
    giggles: [
      'oh— ha! there you go.',
      'mmph. you’re ticklish in there, aren’t you?',
      'keep moving, trouble. I like the company.',
      'oh my god. that’s ridiculous. do it again.',
      'heh. all that fight, and nowhere to go.'
    ],
    lines: [
      {
        text: 'Sit. You’re late, and now you owe me a story.',
        options: [
          { text: 'I got held up choosing what to wear for you.', tone: 'good' },
          { text: 'What kind of story?', tone: 'neutral' },
          { text: 'Traffic.', tone: 'bad' },
          { text: 'I’m not late. You’re early.', tone: 'bad' }
        ]
      },
      {
        text: 'I’m a dancer. Before you ask— yes, I’m flexible. No, that’s not an invitation.',
        options: [
          { text: 'Noted. I’ll earn the invitation.', tone: 'good' },
          { text: 'What kind of dance?', tone: 'neutral' },
          { text: 'I wasn’t going to ask.', tone: 'bad' },
          { text: 'Shame.', tone: 'bad' }
        ]
      },
      {
        text: 'Everyone thinks I’m a lot. Too loud. Too bright. Too much. What do you think?',
        options: [
          { text: 'I think “too much” is what cowards say about fireworks.', tone: 'good' },
          { text: 'You are definitely loud.', tone: 'neutral' },
          { text: 'You are kind of a lot.', tone: 'bad' },
          { text: 'Could you tone it down a little?', tone: 'bad' }
        ]
      },
      {
        text: 'If we went out and someone tried to dance with me, what would you do?',
        options: [
          { text: 'Ask if you wanted me to cut in. Then let you decide.', tone: 'good' },
          { text: 'Depends on the song.', tone: 'neutral' },
          { text: 'Start a fight.', tone: 'bad' },
          { text: 'Nothing. You can handle yourself.', tone: 'bad' }
        ]
      },
      {
        text: 'I bite my lip when I’m nervous. Can you tell?',
        options: [
          { text: 'I can. It’s unfairly distracting.', tone: 'good' },
          { text: 'Are you nervous right now?', tone: 'neutral' },
          { text: 'It’s a bad habit.', tone: 'bad' },
          { text: 'Not really.', tone: 'bad' }
        ]
      },
      {
        text: 'I don’t do boring. If I get bored, I leave. Should I be worried?',
        options: [
          { text: 'Then I’ll make sure you never catch your breath.', tone: 'good' },
          { text: 'What counts as boring?', tone: 'neutral' },
          { text: 'I’m a pretty boring person.', tone: 'bad' },
          { text: 'No pressure or anything.', tone: 'bad' }
        ]
      },
      {
        text: 'One dance. Right here. No music. Show me what you’ve got.',
        options: [
          { text: 'Only if you lead. I want to see what trouble looks like up close.', tone: 'good' },
          { text: 'There isn’t any music.', tone: 'neutral' },
          { text: 'I don’t dance.', tone: 'bad' },
          { text: 'That’s embarrassing.', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'yuki',
    number: '04',
    name: 'Yuki Shiro',
    age: 22,
    handle: '@yukishiro',
    tag: 'The Frost Heiress',
    accent: '#9ed9ff',
    accent2: '#e4f4ff',
    danger: 'collects beautiful things. you qualify.',
    blurb: 'Old money, new rules. Thaws about one degree per sincere compliment.',
    petName: 'darling',
    art: {
      skin: '#f1dccf', skinShade: '#e1c3b4', blush: '#e9a5a5',
      hair: '#edf1f9', hairDark: '#c3d0e3', eye: '#77b5d8',
      bg1: '#e2f6ff', bg2: '#b6def5', outfit: '#23374d', outfitDark: '#142332',
      style: 'hime', bangs: 'blunt', accessory: 'glasses', outfitStyle: 'blazer',
      eyeStyle: 'soft', expression: 'neutral'
    },
    reactions: {
      good: [
        'The corner of her mouth lifts. Almost imperceptibly. “Acceptable.”',
        'She looks away first, which feels like a small victory. “How unexpected.”',
        '“You have a talent for saying the right thing,” she murmurs. “It’s inconvenient.”'
      ],
      neutral: [
        '“I see.” She smooths an invisible crease in the tablecloth.',
        'She inclines her head. “That is one perspective.”',
        '“Duly noted.” Her tone is impossible to read.'
      ],
      bad: [
        'Her expression cools by several degrees. “I see.”',
        '“How fortunate that I asked,” she says, icily.',
        'She sets her cup down with terrible precision. “No.”'
      ]
    },
    winQuote: 'There. Now you are somewhere no one can take you from me. Isn’t that better?',
    leaveQuote: 'You may go. I dislike owing people. We are even.',
    deathQuote: 'What a waste. You were almost worth keeping.',
    giggles: [
      'Oh. That is… undignified.',
      'Stop. I am not laughing. I am not.',
      'A quiet huff of breath. “Ridiculous creature.”',
      'You are making this very difficult for me to remain composed.',
      'She covers her mouth. “Do that again and I shall keep you.”'
    ],
    lines: [
      {
        text: 'I’m told this is where people exchange “fun facts.” I find the ritual exhausting. But go on.',
        options: [
          { text: 'I’d rather learn one true thing about you than ten fun ones.', tone: 'good' },
          { text: 'My fun fact is that I hate fun facts.', tone: 'neutral' },
          { text: 'You should loosen up.', tone: 'bad' },
          { text: 'Okay, this was a mistake.', tone: 'bad' }
        ]
      },
      {
        text: 'My family has money. People usually decide who I am because of it. I assume you’ll do the same.',
        options: [
          { text: 'Then I’ll decide based on the way you hold your teacup.', tone: 'good' },
          { text: 'What do you actually do?', tone: 'neutral' },
          { text: 'So I should be impressed?', tone: 'bad' },
          { text: 'Must be nice.', tone: 'bad' }
        ]
      },
      {
        text: 'I don’t like surprises. They’re just problems wearing ribbons.',
        options: [
          { text: 'Then I’ll give you the plan in advance.', tone: 'good' },
          { text: 'Even good surprises?', tone: 'neutral' },
          { text: 'You need to live a little.', tone: 'bad' },
          { text: 'That sounds lonely.', tone: 'bad' }
        ]
      },
      {
        text: 'I have a difficult time trusting people. It isn’t personal.',
        options: [
          { text: 'I’d rather be trusted slowly than borrowed quickly.', tone: 'good' },
          { text: 'Has someone broken your trust before?', tone: 'neutral' },
          { text: 'Everyone has issues.', tone: 'bad' },
          { text: 'That’s kind of a red flag.', tone: 'bad' }
        ]
      },
      {
        text: 'The gala is Saturday. I need someone who won’t embarrass me. Would you?',
        options: [
          { text: 'I clean up well. And I’d only look at you.', tone: 'good' },
          { text: 'What’s the dress code?', tone: 'neutral' },
          { text: 'I’m not really a gala person.', tone: 'bad' },
          { text: 'Depends what’s in it for me.', tone: 'bad' }
        ]
      },
      {
        text: 'You’re not what I expected. I expected someone easier to read.',
        options: [
          { text: 'Then read me slowly. I don’t mind being a long book.', tone: 'good' },
          { text: 'Is that a good thing?', tone: 'neutral' },
          { text: 'I’m not complicated.', tone: 'bad' },
          { text: 'You shouldn’t judge people.', tone: 'bad' }
        ]
      },
      {
        text: 'If I asked you to stay after everyone leaves, would you understand what I meant?',
        options: [
          { text: 'Yes. And I’d stay as long as you asked.', tone: 'good' },
          { text: 'What would you mean?', tone: 'neutral' },
          { text: 'You’re being cryptic.', tone: 'bad' },
          { text: 'I have work in the morning.', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'jade',
    number: '05',
    name: 'Jade Ruiz',
    age: 22,
    handle: '@jaderuiz',
    tag: 'The Gym Rat',
    accent: '#b8e36e',
    accent2: '#ffdf6e',
    danger: 'does not know her own strength',
    blurb: 'Protein shakes, direct eye contact, zero patience for games. Literally.',
    petName: 'champ',
    art: {
      skin: '#c88d6c', skinShade: '#ae7253', blush: '#c56f65',
      hair: '#3f5235', hairDark: '#26331f', eye: '#a46b3d',
      bg1: '#e9f3c2', bg2: '#c5dc82', outfit: '#243528', outfitDark: '#142117',
      style: 'pony', bangs: 'wispy', accessory: 'headband', outfitStyle: 'tank',
      eyeStyle: 'round', expression: 'smile'
    },
    reactions: {
      good: [
        'A wide, unguarded grin. “Okay. Yeah. I like you.”',
        'She flexes one arm absently, pleased. “Good answer, champ.”',
        '“See, this is why I swiped right.” She clinks her glass against yours.'
      ],
      neutral: [
        'She nods, ponytail bouncing. “Cool, cool. Anyway.”',
        '“That’s fair.” She stretches. “Next question.”',
        '“Huh. Okay.” She does not elaborate.'
      ],
      bad: [
        'Her grin drops. “Oof. That’s a skipped-rep answer.”',
        '“Yikes.” She winces. “You’re lucky you’re pretty.”',
        'She cracks her knuckles out of habit. “Let’s try that again.”'
      ]
    },
    winQuote: 'There. Nice and close. You’re my favorite kind of cardio.',
    leaveQuote: 'Go. But I’m holding you to that breakfast.',
    deathQuote: 'Damn. I thought you could keep up.',
    giggles: [
      'pfft— okay, that’s actually kind of cute.',
      'oh, you’re ticklish. good to know.',
      'hah! keep going, champ.',
      'mmph. you’re stronger than you look.',
      'stop, stop— I’m gonna get a cramp from laughing.'
    ],
    lines: [
      {
        text: 'I almost cancelled. Not because of you. I just really wanted to finish leg day.',
        options: [
          { text: 'Respect. I’ll take the remaining set.', tone: 'good' },
          { text: 'How was leg day?', tone: 'neutral' },
          { text: 'You’d cancel a date for the gym?', tone: 'bad' },
          { text: 'That’s a weird priority.', tone: 'bad' }
        ]
      },
      {
        text: 'I do not do subtle. If I like you, I’ll say it. If I don’t, you’ll know. Cool?',
        options: [
          { text: 'Perfect. I’m bad at guessing games anyway.', tone: 'good' },
          { text: 'That’s refreshing.', tone: 'neutral' },
          { text: 'Maybe play hard to get a little.', tone: 'bad' },
          { text: 'That’s kind of blunt.', tone: 'bad' }
        ]
      },
      {
        text: 'I can bench you. Like, easily. Is that intimidating?',
        options: [
          { text: 'No. It’s the most attractive thing I’ve heard all week.', tone: 'good' },
          { text: 'How much do you bench?', tone: 'neutral' },
          { text: 'That’s a little scary.', tone: 'bad' },
          { text: 'I’d rather not be manhandled.', tone: 'bad' }
        ]
      },
      {
        text: 'My ex said I was “too much energy.” I think he was just out of shape.',
        options: [
          { text: 'Good thing I’m keeping up.', tone: 'good' },
          { text: 'How often do you work out?', tone: 'neutral' },
          { text: 'Maybe you came on a little strong.', tone: 'bad' },
          { text: 'He had a point.', tone: 'bad' }
        ]
      },
      {
        text: 'I want someone who’ll spot me. Not just at the gym. You know?',
        options: [
          { text: 'I’ve got you. On the last rep and everywhere else.', tone: 'good' },
          { text: 'How do you mean?', tone: 'neutral' },
          { text: 'I’m not really a gym person.', tone: 'bad' },
          { text: 'That sounds like a lot of commitment.', tone: 'bad' }
        ]
      },
      {
        text: 'I brought you a protein shake. It tastes like chalk. I’m sorry.',
        options: [
          { text: 'I’ll drink it if you promise to make me breakfast after.', tone: 'good' },
          { text: 'What flavor is it?', tone: 'neutral' },
          { text: 'That’s not really a date gift.', tone: 'bad' },
          { text: 'I’ll pass. That stuff is gross.', tone: 'bad' }
        ]
      },
      {
        text: 'Last one. Are you going to ask for my number, or do I have to do everything?',
        options: [
          { text: 'Give me your phone. I’m putting my number in under “Yours.”', tone: 'good' },
          { text: 'I was going to ask.', tone: 'neutral' },
          { text: 'I don’t know. Should I?', tone: 'bad' },
          { text: 'I was going to wait.', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'nyx',
    number: '06',
    name: 'Nyx Vale',
    age: 23,
    handle: '@nyxvale',
    tag: 'The Occult Bookworm',
    accent: '#bd97ff',
    accent2: '#ff9dce',
    danger: 'has already picked a jar for your heart',
    blurb: 'Black tea, blacker eyeliner. Reads your future and doesn’t sugarcoat it.',
    petName: 'little omen',
    art: {
      skin: '#e7c2b7', skinShade: '#d4a398', blush: '#c77f8a',
      hair: '#211c2d', hairDark: '#100c18', eye: '#b69ae0',
      bg1: '#d9c9f0', bg2: '#a590c9', outfit: '#171220', outfitDark: '#08050d',
      style: 'wavy', bangs: 'curtain', accessory: 'crescent', outfitStyle: 'corset',
      eyeStyle: 'soft', expression: 'soft'
    },
    reactions: {
      good: [
        'Her smile is small and sudden, like a candle catching. “You’re not afraid. Interesting.”',
        '“The cards were right about you,” she says, and her voice has gone soft.',
        'She brushes her thumb over your wrist. “Careful. I’m starting to hope.”'
      ],
      neutral: [
        'She tilts her head. “The universe is indifferent. But go on.”',
        '“Hm.” She turns her teacup three times and says nothing else.',
        '“I’ll consult the leaves,” she deadpans.'
      ],
      bad: [
        'The candlelight seems to dim. “How ordinary of you.”',
        'She withdraws her hand. “I see. The cards can be wrong.”',
        '“Noted.” Her smile folds away like a moth.'
      ]
    },
    winQuote: 'I told you I could keep you. I just didn’t say how.',
    leaveQuote: 'The door is unlocked. It always was. That’s what makes it sweet.',
    deathQuote: 'The cards warned you. You never listened.',
    giggles: [
      'Oh. The spirits are ticklish.',
      'mm. a restless little omen.',
      'Stop— hah— I’m trying to be mysterious.',
      'You feel that? That’s me laughing at you.',
      'The tea leaves did not predict this. I’m delighted.'
    ],
    lines: [
      {
        text: 'The cards said I’d meet someone with a soft heart tonight. You’re not bleeding, are you?',
        options: [
          { text: 'Only a little. It’s nice to meet you too.', tone: 'good' },
          { text: 'You read tarot?', tone: 'neutral' },
          { text: 'That’s a creepy way to start.', tone: 'bad' },
          { text: 'I don’t believe in that stuff.', tone: 'bad' }
        ]
      },
      {
        text: 'I like graveyards. Not in a “bury you there” way. Usually.',
        options: [
          { text: '“Usually” is my favorite kind of reassurance.', tone: 'good' },
          { text: 'What do you like about them?', tone: 'neutral' },
          { text: 'That’s not funny.', tone: 'bad' },
          { text: 'You’re kind of dark.', tone: 'bad' }
        ]
      },
      {
        text: 'People think quiet girls are mysterious. Really, I’m just bad at small talk.',
        options: [
          { text: 'Then we can be bad at it together.', tone: 'good' },
          { text: 'What do you want to talk about?', tone: 'neutral' },
          { text: 'You could try being more outgoing.', tone: 'bad' },
          { text: 'Yeah, you’re pretty awkward.', tone: 'bad' }
        ]
      },
      {
        text: 'I made tea. Don’t ask what’s in it.',
        options: [
          { text: 'I trust you. But I’m absolutely asking.', tone: 'good' },
          { text: 'Is it caffeinated?', tone: 'neutral' },
          { text: 'I’m not drinking that.', tone: 'bad' },
          { text: 'That’s not a normal thing to say.', tone: 'bad' }
        ]
      },
      {
        text: 'If I told you I could keep you, would you run?',
        options: [
          { text: 'Not if you asked nicely.', tone: 'good' },
          { text: 'Keep me? Like a houseplant?', tone: 'neutral' },
          { text: 'That’s a red flag.', tone: 'bad' },
          { text: 'Yes. Very fast.', tone: 'bad' }
        ]
      },
      {
        text: 'I’m not good at keeping people. They usually get bored of the darkness.',
        options: [
          { text: 'I don’t scare easy. And your darkness has good taste in tea.', tone: 'good' },
          { text: 'What do you do for fun?', tone: 'neutral' },
          { text: 'Maybe you should be less depressing.', tone: 'bad' },
          { text: 'I can see why.', tone: 'bad' }
        ]
      },
      {
        text: 'You’re still here. I’ve decided that means something.',
        options: [
          { text: 'It does. I’m not going anywhere.', tone: 'good' },
          { text: 'What does it mean?', tone: 'neutral' },
          { text: 'It means the tea is good.', tone: 'bad' },
          { text: 'Don’t read into it.', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'sora',
    number: '07',
    name: 'Sora Bloom',
    age: 21,
    handle: '@sorabloom',
    tag: 'The Sunshine Baker',
    accent: '#ffae5c',
    accent2: '#ffe08a',
    danger: 'will feed you until you can’t leave',
    blurb: 'Flour on her nose, butter in everything, room for one more at the table.',
    petName: 'sweetheart',
    art: {
      skin: '#f7cfb6', skinShade: '#e7b496', blush: '#ef9e98',
      hair: '#dc8e52', hairDark: '#b86433', eye: '#7d9b5e',
      bg1: '#ffe5c1', bg2: '#f8c98b', outfit: '#f6e7cf', outfitDark: '#d7b890',
      style: 'wavy', bangs: 'wispy', accessory: 'bandana', outfitStyle: 'apron',
      eyeStyle: 'round', expression: 'beam', freckles: true
    },
    reactions: {
      good: [
        'She beams, whole face brightening. “You’re going to make me burn something.”',
        '“Okay, that’s it.” She presses a hand to her cheek. “I’m keeping you.”',
        'She laughs, warm and surprised. “You’re sweeter than the frosting.”'
      ],
      neutral: [
        '“Mm-hm!” She nods, already thinking about something else.',
        '“Oh! Interesting.” She tucks a curl behind her ear.',
        '“That’s okay. Here, try this one.” She slides a pastry over.'
      ],
      bad: [
        'Her smile wobbles. “Oh. Right. Sorry.”',
        '“That’s— okay. No, it’s fine.” She brushes flour off her hands too hard.',
        'The warmth leaves her eyes. “I see.”'
      ]
    },
    winQuote: 'There we go. All warm and safe. I told you I’d take care of you.',
    leaveQuote: 'Okay. But I’m packing you something for the road. Don’t argue.',
    deathQuote: 'Oh, sweetheart. You should have let me take care of you.',
    giggles: [
      'eep— haha! okay, okay.',
      'you’re wriggling like a little pastry.',
      'stop, you’re going to make me drop something.',
      'hehehe— that’s so cute. do it again.',
      'oh! you found the ticklish spot.'
    ],
    lines: [
      {
        text: 'You came! I made three kinds of pastries because I couldn’t decide. Please don’t judge the mess.',
        options: [
          { text: 'I’m judging the effort. Ten out of ten.', tone: 'good' },
          { text: 'What kinds?', tone: 'neutral' },
          { text: 'Three? That’s a lot.', tone: 'bad' },
          { text: 'The kitchen’s a disaster.', tone: 'bad' }
        ]
      },
      {
        text: 'I always wanted a little café. Something warm. Somewhere people stay too long.',
        options: [
          { text: 'I’d stay until closing. Then help you flip the chairs.', tone: 'good' },
          { text: 'What would you call it?', tone: 'neutral' },
          { text: 'That’s a hard business.', tone: 'bad' },
          { text: 'How original.', tone: 'bad' }
        ]
      },
      {
        text: 'I have a bad habit of taking care of everyone. It makes some people feel smothered.',
        options: [
          { text: 'I don’t mind being taken care of. Just don’t forget yourself.', tone: 'good' },
          { text: 'Why do you do it?', tone: 'neutral' },
          { text: 'Yeah, that can be exhausting.', tone: 'bad' },
          { text: 'I don’t need a babysitter.', tone: 'bad' }
        ]
      },
      {
        text: 'There’s flour on my nose, isn’t there? Tell me there isn’t.',
        options: [
          { text: 'There is. It’s the cutest thing I’ve seen all day.', tone: 'good' },
          { text: 'A little. Here.', tone: 'neutral' },
          { text: 'Yeah. You look ridiculous.', tone: 'bad' },
          { text: 'No, you’re fine.', tone: 'bad' }
        ]
      },
      {
        text: 'If I baked something for you every day, would you get tired of it?',
        options: [
          { text: 'Every day? I’d start a spreadsheet.', tone: 'good' },
          { text: 'What would you bake?', tone: 'neutral' },
          { text: 'Probably. Variety is good.', tone: 'bad' },
          { text: 'That’s a lot of pressure.', tone: 'bad' }
        ]
      },
      {
        text: 'I want someone who comes home. Not just visits. You know?',
        options: [
          { text: 'I know. I’d come home to you.', tone: 'good' },
          { text: 'You mean like living together?', tone: 'neutral' },
          { text: 'That’s moving fast.', tone: 'bad' },
          { text: 'I’m not really a homebody.', tone: 'bad' }
        ]
      },
      {
        text: 'This was really nice. I don’t want to overthink it, but… was it a date?',
        options: [
          { text: 'It was. And I’d like the next one to be longer.', tone: 'good' },
          { text: 'What do you think it was?', tone: 'neutral' },
          { text: 'Let’s just see where it goes.', tone: 'bad' },
          { text: 'I don’t know. Was it?', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'riven',
    number: '08',
    name: 'Riven Kade',
    age: 22,
    handle: '@rivenkade',
    tag: 'The Riot Grrrl',
    accent: '#8fe7ff',
    accent2: '#ff7a9e',
    danger: 'bites first, asks later',
    blurb: 'Doc Martens, split-dyed hair, a soft spot she’ll deny under oath.',
    petName: 'groupie',
    art: {
      skin: '#e9c1ae', skinShade: '#d5a48f', blush: '#d77f82',
      hair: '#202936', hairDark: '#0f151d', hairStreak: '#7fd8ff', eye: '#67b5d6',
      bg1: '#c6ecf3', bg2: '#8ccddc', outfit: '#1b1a21', outfitDark: '#0d0c11',
      style: 'shag', bangs: 'blunt', accessory: 'pins', outfitStyle: 'jacket',
      eyeStyle: 'sharp', expression: 'smirk'
    },
    reactions: {
      good: [
        'She tries to scowl and fails. “Ugh. You’re making this weird.”',
        '“Careful,” she says, but she’s already leaning closer. “I bite.”',
        'She covers her mouth with her sleeve. “Shut up. That was cute.”'
      ],
      neutral: [
        '“Cool.” She pops her gum and looks at the ceiling.',
        '“Huh.” She bounces her knee. “Okay.”',
        '“Whatever,” she says, with no real heat.'
      ],
      bad: [
        'Her jaw tightens. “Right. Cool. Great.”',
        '“Wow. Thanks,” she deadpans, already reaching for her jacket.',
        'She laughs without humor. “You really know how to kill a mood.”'
      ]
    },
    winQuote: 'Shh. Stop fighting it. You’re mine now, groupie.',
    leaveQuote: 'Get out of here. Before I change my mind.',
    deathQuote: 'Told you I bite. Should’ve listened.',
    giggles: [
      'pfft— ha! you’re actually doing it.',
      'oh my god, stop— no, don’t stop.',
      'you’re such a dork. I can feel you flailing.',
      'hah! that one got me.',
      'shut up. I’m not giggling. I’m— okay, I’m giggling.'
    ],
    lines: [
      {
        text: 'You’re not what I expected. I thought you’d be scared of me.',
        options: [
          { text: 'I’m terrified. But I’m also curious. It’s a whole thing.', tone: 'good' },
          { text: 'Should I be scared of you?', tone: 'neutral' },
          { text: 'You’re not that intimidating.', tone: 'bad' },
          { text: 'I’m only here because my friend made me.', tone: 'bad' }
        ]
      },
      {
        text: 'I play guitar. Loud. Angry. Badly. Want to hear?',
        options: [
          { text: 'Only if you let me be your loudest fan.', tone: 'good' },
          { text: 'What kind of music?', tone: 'neutral' },
          { text: 'Maybe not right now.', tone: 'bad' },
          { text: 'I’m not really into that.', tone: 'bad' }
        ]
      },
      {
        text: 'I get told I’m “too aggressive.” Usually by guys who can’t keep up.',
        options: [
          { text: 'Then let me keep up.', tone: 'good' },
          { text: 'Aggressive how?', tone: 'neutral' },
          { text: 'You could try being softer.', tone: 'bad' },
          { text: 'They might have a point.', tone: 'bad' }
        ]
      },
      {
        text: 'I have a tattoo. It’s a secret. You have to earn it.',
        options: [
          { text: 'Then consider me at the beginning of a very long application.', tone: 'good' },
          { text: 'Where is it?', tone: 'neutral' },
          { text: 'I don’t care about tattoos.', tone: 'bad' },
          { text: 'That’s kind of childish.', tone: 'bad' }
        ]
      },
      {
        text: 'Under all this, I’m actually kind of a mess. Don’t tell anyone.',
        options: [
          { text: 'Your secret’s safe. I like messy.', tone: 'good' },
          { text: 'What kind of mess?', tone: 'neutral' },
          { text: 'Yeah, I can tell.', tone: 'bad' },
          { text: 'I prefer people who have it together.', tone: 'bad' }
        ]
      },
      {
        text: 'If someone talked crap about me, would you say something?',
        options: [
          { text: 'I’d say something. Then I’d hold your jacket while you finish it.', tone: 'good' },
          { text: 'Depends what they said.', tone: 'neutral' },
          { text: 'Probably not. I avoid drama.', tone: 'bad' },
          { text: 'You can fight your own battles.', tone: 'bad' }
        ]
      },
      {
        text: 'I want to see you again. But I don’t want to be the only one saying it.',
        options: [
          { text: 'You’re not. I’ve been trying to find the right words all night.', tone: 'good' },
          { text: 'I’d like that.', tone: 'neutral' },
          { text: 'Let’s not rush.', tone: 'bad' },
          { text: 'We’ll see.', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'amber',
    number: '09',
    name: 'Amber Wren',
    age: 23,
    handle: '@amberwren',
    tag: 'The Café Poet',
    accent: '#d9a66a',
    accent2: '#f4d28c',
    danger: 'will romanticize you in verse',
    blurb: 'Rain on the window, pen in her hand, an entire galaxy behind her eyes.',
    petName: 'muse',
    art: {
      skin: '#d8a886', skinShade: '#c08e6d', blush: '#c97c76',
      hair: '#6d4532', hairDark: '#4a2b20', eye: '#8e6542',
      bg1: '#f0dcb8', bg2: '#d9ba84', outfit: '#392b29', outfitDark: '#241918',
      style: 'wavy', bangs: 'curtain', accessory: 'beanie', outfitStyle: 'tee',
      eyeStyle: 'soft', expression: 'soft'
    },
    reactions: {
      good: [
        'She looks down at her notebook, smiling. “That’s going in a poem. You’ve been warned.”',
        '“You say things like that,” she murmurs, “and I start believing in good timing.”',
        'Her eyes soften. “I’m glad I brought the book and didn’t need it.”'
      ],
      neutral: [
        '“Mm.” She draws a small circle in the margin of her notebook.',
        '“I like that you asked,” she says, and leaves it there.',
        'She nods slowly, watching the rain instead of you.'
      ],
      bad: [
        'Her pen stops moving. “Ah. I see.”',
        '“Right.” The word is quiet, folded carefully.',
        'She closes the notebook. “Maybe we should order something else.”'
      ]
    },
    winQuote: 'I could write a thousand poems about this. But I’d rather just stay.',
    leaveQuote: 'Go on. I’ll write about you anyway.',
    deathQuote: 'I’ll make something beautiful out of this. I promise.',
    giggles: [
      'hah— oh, that’s going in the poem.',
      'mm. you’re a restless little stanza.',
      'stop— I’m going to lose my train of thought.',
      'hehe. the rain isn’t the only thing moving.',
      'you’re ridiculous. I like ridiculous.'
    ],
    lines: [
      {
        text: 'I brought a book. I thought if the date went badly, I could pretend to read.',
        options: [
          { text: 'If it goes badly, read to me. That’s a better escape.', tone: 'good' },
          { text: 'What are you reading?', tone: 'neutral' },
          { text: 'Were you expecting it to go badly?', tone: 'bad' },
          { text: 'That’s kind of rude.', tone: 'bad' }
        ]
      },
      {
        text: 'I write poetry. Mostly about rain. Sometimes about people who leave.',
        options: [
          { text: 'I’d like to be a poem that stays.', tone: 'good' },
          { text: 'Can I read one?', tone: 'neutral' },
          { text: 'Poetry’s a bit pretentious.', tone: 'bad' },
          { text: 'That’s a little depressing.', tone: 'bad' }
        ]
      },
      {
        text: 'I love rainy days. Everyone else complains, and I get the whole world to myself.',
        options: [
          { text: 'Then I’ll bring the coffee. You bring the quiet.', tone: 'good' },
          { text: 'What do you do on rainy days?', tone: 'neutral' },
          { text: 'Rain is miserable.', tone: 'bad' },
          { text: 'You should get out more.', tone: 'bad' }
        ]
      },
      {
        text: 'I’m not great at knowing when someone likes me. I always assume they’re just being nice.',
        options: [
          { text: 'Then let me be obvious. I like you.', tone: 'good' },
          { text: 'Why do you think that is?', tone: 'neutral' },
          { text: 'Maybe you’re overthinking it.', tone: 'bad' },
          { text: 'You’re kind of insecure.', tone: 'bad' }
        ]
      },
      {
        text: 'This café plays the same song every hour. I’ve started to think it’s a sign.',
        options: [
          { text: 'A sign that we should stay for the next one.', tone: 'good' },
          { text: 'What song is it?', tone: 'neutral' },
          { text: 'It’s just a playlist.', tone: 'bad' },
          { text: 'That’s a reach.', tone: 'bad' }
        ]
      },
      {
        text: 'I want to know what you’re like when no one’s watching. The unedited version.',
        options: [
          { text: 'Boring, mostly. But I’d let you see.', tone: 'good' },
          { text: 'What would you want to know?', tone: 'neutral' },
          { text: 'I’m always the same.', tone: 'bad' },
          { text: 'That’s a strange question.', tone: 'bad' }
        ]
      },
      {
        text: 'I wrote a line about you already. It’s not very good. But it’s true.',
        options: [
          { text: 'Read it to me. I promise I’ll only blush a little.', tone: 'good' },
          { text: 'What’s the line?', tone: 'neutral' },
          { text: 'That’s fast.', tone: 'bad' },
          { text: 'I’d rather you didn’t.', tone: 'bad' }
        ]
      }
    ]
  },
  {
    id: 'iris',
    number: '10',
    name: 'Iris Lune',
    age: 21,
    handle: '@irislune',
    tag: 'The Cyber Idol',
    accent: '#d4c5ff',
    accent2: '#8be9ff',
    danger: 'will make you her only encore',
    blurb: 'A thousand lights, one girl. Wants to know if you’d stay after the encore.',
    petName: 'starlight',
    art: {
      skin: '#f2d4cb', skinShade: '#e3b9b1', blush: '#e99aa8',
      hair: '#d9d1ec', hairDark: '#a79bc9', eye: '#b080dc',
      bg1: '#dcd8ff', bg2: '#aba6e6', outfit: '#342e58', outfitDark: '#1e1a37',
      style: 'long', bangs: 'blunt', accessory: 'halo', outfitStyle: 'stage',
      eyeStyle: 'soft', expression: 'smile'
    },
    reactions: {
      good: [
        'The stage smile softens into something real. “You mean that. I can tell.”',
        'She reaches out, then stops herself. “Don’t say things like that unless you mean them.”',
        '“Off the record,” she whispers, “that was my favorite part of the night.”'
      ],
      neutral: [
        '“Mm.” She smooths her skirt. “That’s a safe answer.”',
        'She nods, but the performance flickers back on for a second.',
        '“I see.” The lights seem a little further away.'
      ],
      bad: [
        'Her smile stays exactly where it is. That’s how you know. “I understand.”',
        '“Of course.” She folds her hands. “Everyone’s allowed their opinion.”',
        'The sparkle in her eyes dims. “Right. Stupid of me to ask.”'
      ]
    },
    winQuote: 'No cameras. No stage. Just you, right where the whole world can’t see.',
    leaveQuote: 'The encore has to end sometime. Doesn’t it?',
    deathQuote: 'Now you’ll never have to leave. Isn’t that what you wanted?',
    giggles: [
      'oh— haha! that’s not very idol-like of me.',
      'mmph. my fans would never believe this.',
      'stop, stop— I have a reputation.',
      'hehe. you’re cute when you flail.',
      'the stage lights never made me laugh like this.'
    ],
    lines: [
      {
        text: 'One night. That’s all I asked for. Then my manager booked me for a photoshoot at six.',
        options: [
          { text: 'Then let’s make tonight worth the missed sleep.', tone: 'good' },
          { text: 'What’s the photoshoot for?', tone: 'neutral' },
          { text: 'That’s a terrible schedule.', tone: 'bad' },
          { text: 'Maybe you should quit.', tone: 'bad' }
        ]
      },
      {
        text: 'I’m an idol. My whole life is a performance. Sometimes I forget which smile is mine.',
        options: [
          { text: 'Then I’ll be the one person you don’t have to perform for.', tone: 'good' },
          { text: 'Do you ever get a day off?', tone: 'neutral' },
          { text: 'That sounds exhausting.', tone: 'bad' },
          { text: 'At least you’re famous.', tone: 'bad' }
        ]
      },
      {
        text: 'My fans think they know me. The real me is… quieter. Smaller.',
        options: [
          { text: 'I’d like to meet her. The small, quiet one.', tone: 'good' },
          { text: 'What’s the real you like?', tone: 'neutral' },
          { text: 'That’s a lot of drama.', tone: 'bad' },
          { text: 'Fans are just passionate.', tone: 'bad' }
        ]
      },
      {
        text: 'I can’t be seen dating. If this gets out, it becomes a headline. Are you okay with that?',
        options: [
          { text: 'I care more about you than the headline.', tone: 'good' },
          { text: 'How would we handle it?', tone: 'neutral' },
          { text: 'That sounds like too much.', tone: 'bad' },
          { text: 'I don’t want to be a secret.', tone: 'bad' }
        ]
      },
      {
        text: 'Everyone wants the version of me on stage. Nobody asks what happens after the lights go out.',
        options: [
          { text: 'I’m asking. What happens after?', tone: 'good' },
          { text: 'What do you do after a show?', tone: 'neutral' },
          { text: 'That’s the price of fame.', tone: 'bad' },
          { text: 'You’re being dramatic.', tone: 'bad' }
        ]
      },
      {
        text: 'I don’t know how to do this. Being close to someone without turning it into content.',
        options: [
          { text: 'Then let’s keep this off the record.', tone: 'good' },
          { text: 'You could take a break from posting.', tone: 'neutral' },
          { text: 'You’re overthinking it.', tone: 'bad' },
          { text: 'Everything is content these days.', tone: 'bad' }
        ]
      },
      {
        text: 'If I gave you my real number— not the business one— would you use it?',
        options: [
          { text: 'I’d use it every day. Even when you’re too busy to reply.', tone: 'good' },
          { text: 'What’s the difference?', tone: 'neutral' },
          { text: 'Probably, yeah.', tone: 'bad' },
          { text: 'I’m not much of a texter.', tone: 'bad' }
        ]
      }
    ]
  }
];

export const STATUS_BANDS = [
  { max: 14, label: 'Ice cold', note: 'She is already looking at the door.' },
  { max: 29, label: 'On thin ice', note: 'One wrong word could be your last.' },
  { max: 44, label: 'Curious', note: 'She has not decided what to do with you yet.' },
  { max: 59, label: 'Warming up', note: 'There is something hungry in her smile.' },
  { max: 74, label: 'Into you', note: 'Her attention feels like teeth.' },
  { max: 89, label: 'Smitten', note: 'She is measuring you for something.' },
  { max: 99, label: 'Obsessed', note: 'Do not look away. Do not blink.' },
  { max: 100, label: 'Devoured', note: 'Dinner is served.' }
];

export function statusFor(love) {
  return STATUS_BANDS.find((band) => love <= band.max) || STATUS_BANDS[STATUS_BANDS.length - 1];
}
