package com.example.pbl4Version1.constant;

import java.util.ArrayList;
import java.util.List;

import com.example.pbl4Version1.entity.Achievement;

public class PredefinedAchievement {

    // 1. Welcome
    private static final Achievement welcome =
            new Achievement("Chào mừng", "../assets/img/achievement/welcome.png", "Tạo tài khoản cờ vua");

    // 2. Self-portrait
    private static final Achievement selfPortrait = new Achievement(
            "Tự chụp ảnh", "../assets/img/achievement/selfPortrait.png", "Thay đổi ảnh đại diện từ mặc định");

    // 3. Live for the first time!
    private static final Achievement liveFirstTime = new Achievement(
            "Online lần đầu tiên!", "../assets/img/achievement/liveFirstTime.png", "Chơi một ván online");

    // 4. Daily first!
    private static final Achievement dailyFirst = new Achievement(
            "Hàng ngày đầu tiên!", "../assets/img/achievement/dailyFirst.png", "Chơi trò chơi hàng ngày");

    // 5. First Word
    private static final Achievement firstWord =
            new Achievement("Từ đầu tiên", "../assets/img/achievement/firstWord.png", "Bình luận hoặc gửi tin nhắn");

    // 6. Human vs Machine
    private static final Achievement humanVsMachine = new Achievement(
            "Con người đấu với máy",
            "../assets/img/achievement/humanVsMachine.png",
            "Chơi một ván cờ vua với máy tính");

    // 7. Live 10
    private static final Achievement live10 =
            new Achievement("Online 10", "../assets/img/achievement/live10.png", "Chơi 10 ván online");

    // 8. Live 100

    private static final Achievement live100 =
            new Achievement("Trực tiếp 100", "../assets/img/achievement/live100.png", "Chơi 100 ván trực tiếp");

    // 9. Daily 5
    private static final Achievement daily5 =
            new Achievement("Hàng ngày 5", "../assets/img/achievement/daily5.png", "Chơi 5 ván hàng ngày");

    // 10. Daily 10
    private static final Achievement daily10 =
            new Achievement("Hàng ngày 10", "../assets/img/achievement/daily10.png", "Chơi 10 ván hàng ngày");

    // 11. Assassin Pawn
    private static final Achievement assassinPawn =
            new Achievement("Tốt sát thủ", "../assets/img/achievement/assassinPawn.png", "Chiếu hết bằng tốt ");

    // 12. Assassin Knight
    private static final Achievement assassinKnight =
            new Achievement("Mã sát thủ", "../assets/img/achievement/assassinKnight.png", "Chiếu hết bằng mã");

    // 13. Assassin Bishop
    private static final Achievement assassinBishop =
            new Achievement("Sát thủ Tượng", "../assets/img/achievement/assassinBishop.png", "Chiếu hết với Tượng");

    // 14. Killer Rook
    private static final Achievement killerRook =
            new Achievement("Xe Sát Thủ", "../assets/img/achievement/killerRook.png", "Chiếu hết với Xe");

    // 15. Assassin Queen
    private static final Achievement assassinQueen =
            new Achievement("Hậu Sát Thủ", "../assets/img/achievement/assassinQueen.png", "Chiếu hết với Hậu");

    // 16. Castle Conqueror
    private static final Achievement castleConqueror = new Achievement(
            "Chinh Phục Lâu Đài ", "../assets/img/achievement/castleConqueror.png", "Chiếu hết bằng cách nhập thành");

    // 17. World Traveler
    private static final Achievement worldTraveler = new Achievement(
            "Du Hành Thế Giới",
            "../assets/img/achievement/worldTraveler.png",
            "Chơi với những người từ 10 quốc gia khác nhau");

    // 18. Chess Marathon
    private static final Achievement chessMarathon = new Achievement(
            "Marathon Cờ Vua", "../assets/img/achievement/chessMarathon.png", "Chơi một ván cờ với hơn 100 nước đi");

    // 19. Rapid Strike
    private static final Achievement rapidStrike = new Achievement(
            "Đòn Nhanh", "../assets/img/achievement/rapidStrike.png", "Chơi một ván cờ với ít hơn 20 nước đi");

    // 20. Nick of Time
    private static final Achievement nickOfTime = new Achievement(
            "Thời gian gấp rút",
            "../assets/img/achievement/nickOfTime.png",
            "Thắng một ván cờ khi còn chưa đầy một giây");

    // 21. Full House
    private static final Achievement fullHouse = new Achievement(
            "Nhà đầy đủ", "../assets/img/achievement/fullHouse.png", "Thắng một ván cờ mà không mất một quân nào");

    // 22. Ballot Box
    private static final Achievement ballotBox =
            new Achievement("Hộp Phiếu", "../assets/img/achievement/ballotBox.png", "Bỏ phiếu trong một ván bỏ phiếu");

    // 23. Say Hello
    private static final Achievement sayHello =
            new Achievement(" Nói Xin Chào", "../assets/img/achievement/sayHello.png", "Gửi Tin Nhắn");

    // 24. Devoted
    private static final Achievement devoted =
            new Achievement("Tận Tâm", "../assets/img/achievement/devoted.png", "Đăng Nhập Mỗi Ngày Trong 7 Ngày");

    // 25. Fanatic
    private static final Achievement fanatic =
            new Achievement("Cuồng Nhiệt", "../assets/img/achievement/fanatic.png", "Đăng Nhập Mỗi Ngày Trong 30 Ngày");

    // 26. Finger Paint
    private static final Achievement fingerPaint =
            new Achievement("Sơn Ngón Tay", "../assets/img/achievement/fingerPaint.png", "Tùy Chỉnh Chủ Đề Của Bạn");

    private PredefinedAchievement() {}

    public static List<Achievement> predefinedAchievements() {
        List<Achievement> achievements = new ArrayList<>();
        achievements.add(welcome);
        achievements.add(selfPortrait);
        achievements.add(liveFirstTime);
        achievements.add(dailyFirst);
        achievements.add(firstWord);
        achievements.add(humanVsMachine);
        achievements.add(live10);
        achievements.add(live100);
        achievements.add(daily5);
        achievements.add(daily10);
        achievements.add(assassinPawn);
        achievements.add(assassinKnight);
        achievements.add(assassinBishop);
        achievements.add(killerRook);
        achievements.add(assassinQueen);
        achievements.add(castleConqueror);
        achievements.add(worldTraveler);
        achievements.add(chessMarathon);
        achievements.add(rapidStrike);
        achievements.add(nickOfTime);
        achievements.add(fullHouse);
        achievements.add(ballotBox);
        achievements.add(sayHello);
        achievements.add(devoted);
        achievements.add(fanatic);
        achievements.add(fingerPaint);
        return achievements;
    }
}
