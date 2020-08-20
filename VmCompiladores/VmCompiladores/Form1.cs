using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace VmCompiladores
{
    public partial class VmSimulador : Form
    {
        public VmSimulador()
        {
            InitializeComponent();
        }

        private void menuStrip2_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {

        }

        private void VmSimulador_Load(object sender, EventArgs e)
        {

        }

        private void menuStrip1_ItemClicked_1(object sender, ToolStripItemClickedEventArgs e)
        {
            var fileContent = string.Empty;

            if (fileDialog.ShowDialog() == DialogResult.OK)
            {
                var filePath = fileDialog.FileName;

                string content = File.ReadAllText(filePath, Encoding.UTF8);
                stackContent.Text = content;

                StreamReader file = new StreamReader(filePath);

                string newline;
                while ((newline = file.ReadLine()) != null)
                {

                    string[] values = newline.Split(' ');
                    string[] row = new string[values.Length];

                    for (int j = 0; j < values.Length; j++)
                    {
                        row[j] = values[j].Trim();
                    }
                    dataGridView1.Rows.Add(row);
                }
            }
        }

        private void fileDialog_FileOk(object sender, CancelEventArgs e)
        {
            
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
