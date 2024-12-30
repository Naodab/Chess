package com.example.pbl4Version1.enums;

public enum Rank {
    BEGGINNER("Beginner", 0, 799),
    AMATEUR("Amateur", 800, 1099),
    INTERMEDIATE("Intermediate", 1100, 1399),
    ADVANCED("Advanced", 1400, 1699),
    EXPERT("Expert", 1700, 1999),
    CANDIDATE_MASTER("Candidate master", 2000, 2199),
    FIDE_MASTER("Fide Master", 2200, 2499),
    GRANDMASTER("Grandmaster", 2500, 2699),
    SUPER_GRANDMASTER("Super Grandmaster", 2700, Integer.MAX_VALUE);

    private String name;
    private int min;
    private int max;

    private Rank(String name, int min, int max) {
        this.name = name;
        this.min = min;
        this.max = max;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public static Rank getRank(int elo) {
        if (elo < Rank.BEGGINNER.max) return Rank.BEGGINNER;
        if (elo < Rank.AMATEUR.max) return Rank.AMATEUR;
        if (elo < Rank.INTERMEDIATE.max) return Rank.INTERMEDIATE;
        if (elo < Rank.ADVANCED.max) return Rank.ADVANCED;
        if (elo < Rank.EXPERT.max) return Rank.EXPERT;
        if (elo < Rank.CANDIDATE_MASTER.max) return Rank.CANDIDATE_MASTER;
        if (elo < Rank.FIDE_MASTER.max) return Rank.FIDE_MASTER;
        if (elo < Rank.GRANDMASTER.max) return Rank.GRANDMASTER;
        return Rank.SUPER_GRANDMASTER;
    }
}
