public class calculadora {
    public static void main(String[] args) {
        int x = Integer.parseInt(args[1]);
        int y = Integer.parseInt(args[2]);
        int g = Integer.parseInt(args[3]);
        int h = Integer.parseInt(args[4]);
        int k = Integer.parseInt(args[5]);
        int l = Integer.parseInt(args[6]);

        if (args[0].equals("somar")) {
            sum(x, y);
        } else if (args[0].equals("subtract")) {
            minus(x, y);
        } else if (args[0].equals("times")){
            times(g, h);
        }
        else  if (args[0].equals("divide")){
            divide(k,l);
        }

    }

        static void sum ( int x, int y){
            System.out.println(x + y);
        }

        static void minus ( int x, int y){
            System.out.println(x - y);
        }
        static void times (int g, int h){
        System.out.println(g * h);
        }

        static void divide (int k, int l){
        System.out.println(k/l);
        }


    }

