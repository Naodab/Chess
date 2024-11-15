package com.example.pbl4Version1.constant;

import com.example.pbl4Version1.entity.Achievement;

public class PredefinedAchievement {
	

	// Achievement format: new Achievement(title, imageUrl, description)

	// 1. Welcome
	private Achievement welcome = new Achievement("Welcome", "../assets/img/achievement/welcome.png", "Create your chess account");

	// 2. Self-portrait
	private Achievement selfPortrait = new Achievement("Self-portrait", "../assets/img/achievement/selfPortrait.png", "Change your avatar from the default");

	// 3. Live for the first time!
	private Achievement liveFirstTime = new Achievement("Live for the first time!", "../assets/img/achievement/liveFirstTime.png", "Play a live game");

	// 4. Daily first!
	private Achievement dailyFirst = new Achievement("Daily first!", "../assets/img/achievement/dailyFirst.png", "Play Games Daily");

	// 5. First Word
	private Achievement firstWord = new Achievement("First Word", "../assets/img/achievement/firstWord.png", "Comment or Send Message");

	// 6. Human vs Machine
	private Achievement humanVsMachine = new Achievement("Human vs Machine", "../assets/img/achievement/humanVsMachine.png", "Play a Live Chess Game Against a Computer");

	// 7. Live 10
	private Achievement live10 = new Achievement("Live 10", "../assets/img/achievement/live10.png", "Play 10 Live Games");

	// 8. Live 100
	private Achievement live100 = new Achievement("Live 100", "../assets/img/achievement/live100.png", "Play 100 Live Games");

	// 9. Daily 5
	private Achievement daily5 = new Achievement("Daily 5", "../assets/img/achievement/daily5.png", "Play 5 Daily Games");

	// 10. Daily 10
	private Achievement daily10 = new Achievement("Daily 10", "../assets/img/achievement/daily10.png", "Play 10 Daily Games");

	// 11. Assassin Pawn
	private Achievement assassinPawn = new Achievement("Assassin Pawn", "../assets/img/achievement/assassinPawn.png", "Checkmate with a pawn (promoted pieces also work)");

	// 12. Assassin Knight
	private Achievement assassinKnight = new Achievement("Assassin Knight", "../assets/img/achievement/assassinKnight.png", "Checkmate with a knight");

	// 13. Assassin Bishop
	private Achievement assassinBishop = new Achievement("Assassin Bishop", "../assets/img/achievement/assassinBishop.png", "Checkmate with a bishop");

	// 14. Killer Rook
	private Achievement killerRook = new Achievement("Killer Rook", "../assets/img/achievement/killerRook.png", "Checkmate with a rook");

	// 15. Assassin Queen
	private Achievement assassinQueen = new Achievement("Assassin Queen", "../assets/img/achievement/assassinQueen.png", "Checkmate with a queen");

	// 16. Castle Conqueror
	private Achievement castleConqueror = new Achievement("Castle Conqueror", "../assets/img/achievement/castleConqueror.png", "Checkmate by castling");

	// 17. World Traveler
	private Achievement worldTraveler = new Achievement("World Traveler", "../assets/img/achievement/worldTraveler.png", "Play with people from 10 different countries (except your own)");

	// 18. Chess Marathon
	private Achievement chessMarathon = new Achievement("Chess Marathon", "../assets/img/achievement/chessMarathon.png", "Play a game with over 100 moves");

	// 19. Rapid Strike
	private Achievement rapidStrike = new Achievement("Rapid Strike", "../assets/img/achievement/rapidStrike.png", "Play a game with less than 20 moves");

	// 20. Nick of Time
	private Achievement nickOfTime = new Achievement("Nick of Time", "../assets/img/achievement/nickOfTime.png", "Win a game with less than a second remaining");

	// 21. Full House
	private Achievement fullHouse = new Achievement("Full House", "../assets/img/achievement/fullHouse.png", "Win a game without losing a piece");

	// 22. Ballot Box
	private Achievement ballotBox = new Achievement("Ballot Box", "../assets/img/achievement/ballotBox.png", "Vote in a Voting Game");

	// 23. Say Hello
	private Achievement sayHello = new Achievement("Say Hello", "../assets/img/achievement/sayHello.png", "Send a Message");

	// 24. Devoted
	private Achievement devoted = new Achievement("Devoted", "../assets/img/achievement/devoted.png", "Log in Every Day for 7 Days");

	// 25. Fanatic
	private Achievement fanatic = new Achievement("Fanatic", "../assets/img/achievement/fanatic.png", "Log in Every Day for 30 Days");

	// 26. Finger Paint
	private Achievement fingerPaint = new Achievement("Finger Paint", "../assets/img/achievement/fingerPaint.png", "Customize Your Theme");

	
	private PredefinedAchievement() {
		
	}
}
