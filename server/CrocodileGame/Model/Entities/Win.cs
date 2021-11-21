using System;
namespace CrocodileGame.Model.Entities
{
    public class Win
    {
        public string Name { get; private set; }
        public string Word { get; private set; }
        public Win(string name, string word)
        {
            Name = name;
            Word = word;
        }
    }
}
